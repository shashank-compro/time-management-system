import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { LeavesModalService } from '../leaves-modal.service';
import { Leave } from '../leave.model';
import { LeavesDataService } from '../leaves-data.service';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-leave-modal',
  templateUrl: './leave-modal.component.html',
  styleUrls: ['./leave-modal.component.css']
})
export class LeaveModalComponent implements OnInit {
  leavesForm: FormGroup;  
  mode: 'edit' | 'new' | 'delete';
  title: 'Leave Application Form' |  'Edit Application Form' | 'Confirm Delete';
  newSubmitted: boolean = false;
  editSubmitted: boolean = false;
  deleteSubmitted: boolean = false;
  saved: boolean = false;
  updated: boolean = false;
  deleted: boolean = false;
  @Output() sendUpdateRequest = new EventEmitter<boolean>();
  faCheck = faCheck;

  constructor(private leavesModalService: LeavesModalService, private leavesDataService: LeavesDataService) { }

  ngOnInit() {
    console.log("ngoninit");
    this.leavesModalService.mode.subscribe((val) => {
      if (val == 'edit') {
        this.title = "Edit Application Form";
        this.mode = 'edit';
      } else if (val == 'new') {
        this.title = "Leave Application Form";
        this.mode = 'new';
      } else {
        this.title = "Confirm Delete";
        this.mode = 'delete';
      }
    });

    this.leavesModalService.leaveFormData.subscribe((data) => {
      this.leavesForm.setValue({
            startDate: data.startDate.substring(0,10),
            endDate:  data.endDate.substring(0,10),
            reason:  data.reason
          });
    });

    this.leavesModalService.newSubmitted.subscribe((status) => {
      this.newSubmitted = status;
    });

    this.leavesModalService.editSubmitted.subscribe((status) => {
      this.editSubmitted = status;
    });

    this.leavesModalService.deleteSubmitted.subscribe((status) => {
      this.deleteSubmitted = status;
    });

    this.leavesModalService.saved.subscribe((status) => {
      this.saved = status;
    });

    this.leavesModalService.updated.subscribe((status) => {
      this.updated = status;
    });

    this.leavesModalService.deleted.subscribe((status) => {
      this.deleted = status;
    });

    this.createForm();
  }

  createForm() {
    this.leavesForm = new FormGroup({
        'startDate' : new FormControl(null, [
              Validators.required]),
        'endDate' : new FormControl(null, [
              Validators.required]),
        'reason' : new FormControl(null, [
              Validators.required]) 
    }, this.compareDates);
  }

  compareDates (controls: AbstractControl): {[key: string]: any} {
    const startDate = controls.get(['startDate']).value;
    const endDate = controls.get(['endDate']).value;
    if (startDate!== null && endDate !== null && new Date(startDate) >= new Date(endDate)) {
      return {datesError:true}
    }
    return null;
  }

  onSubmit () {
    var userPayloadID = this.getUserPayload().tokenPayload.payload.id;
    const leavesFormData = this.leavesForm.value;
    const leave: Leave = {
      "endDate": new Date(leavesFormData.endDate).toISOString(),
      "startDate": new Date(leavesFormData.startDate).toISOString(),
      "reason":  leavesFormData.reason,
      "userId":  userPayloadID
    }
    this.leavesForm.reset();

    if (this.mode == 'new') {
      this.newSubmitted = true;
      this.leavesDataService.postLeave(leave).subscribe(
        () => {
          setTimeout( () => { this.saved = true; }, 1000 );
          // this.saved = true;
          this.sendUpdateRequest.emit();
        },
        (err) => console.log(err),
        () => {
      });

    } else if (this.mode == 'edit') {
        this.editSubmitted = true;      
        this.leavesDataService.updateLeave(leave, this.leavesModalService.getLeaveIdToEdit()).subscribe(
          () => {
            setTimeout( () => { this.updated = true; }, 1000 );
            // this.saved = true;
            this.sendUpdateRequest.emit();
          },
          (err) => console.log(err),
          () => {
  
        });
    } else {
        this.deleteSubmitted = true;      
        this.leavesDataService.deleteLeave(this.leavesModalService.getLeaveIdToEdit()).subscribe(
          () => {
            setTimeout( () => { this.deleted = true; }, 1000 );
            // this.saved = true;
            this.sendUpdateRequest.emit();
          },
          (err) => console.log(err),
          () => {
  
        });
    }
  }

  getUserPayload(){
    return  JSON.parse(localStorage.getItem('userPayload')); 
    }

  onClose () {
    this.leavesForm.reset();
  }

}
