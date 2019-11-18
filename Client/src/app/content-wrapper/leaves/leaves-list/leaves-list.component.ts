import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { LeavesDataService } from '../leaves-data.service';
import { LeavesModalService } from '../leaves-modal.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';
import { Leave } from '../leave.model';
import { logging } from 'selenium-webdriver';
declare var $;

@Component({
  selector: 'app-leaves-list',
  templateUrl: './leaves-list.component.html',
  styleUrls: ['./leaves-list.component.css']
})
export class LeavesListComponent implements OnInit, OnChanges {
  leaveUpdateForm: FormGroup;
  leavesList:Leave[];
  leavelistLength:number;
  faEdit = faEdit;
  faTrash = faTrash;
  // @ViewChild('leaveModal') leaveModal;

  @Input() updateRequired;

  constructor(private leavesDataService: LeavesDataService, private leavesModalService: LeavesModalService) { }

  ngOnInit() {
    // this.createForm();
    this.leavesDataService.getLeaves().subscribe((data) => {
     // this.leavesList = data[];
     //this.leavelistResponseList = data.length;
     this.leavesList = data;
     this.leavelistLength = data.length;
      this.leavesDataService.setLeavesLoaded(true);
    });

  }

  ngOnChanges() {
    this.leavesDataService.getLeaves().subscribe((data) => {
      this.leavesList = data;
      //console.log("In ngonchanges - ",this.leavesList);
    })
  }

  // createForm() {
  //   this.leaveUpdateForm = new FormGroup({
  //       'startDate' : new FormControl(null, [
  //             Validators.required]),
  //       'endDate' : new FormControl(null, [
  //             Validators.required]),
  //       'reason' : new FormControl(null, [
  //             Validators.required]) 
  //   }, this.compareDates);
  // }

  // compareDates (controls: AbstractControl): {[key: string]: any} {
  //   const startDate = controls.get(['startDate']).value;
  //   const endDate = controls.get(['endDate']).value;
  //   if (startDate!== null && endDate !== null && new Date(startDate) >= new Date(endDate)) {
  //     return {datesError:true}
  //   }
  //   return null;
  // }

  // updateFormValues (leave: Leave) {
  //   console.log("in update", leave.startDate);
  //   this.leaveUpdateForm.setValue({
  //     startDate: leave.startDate.substring(0,10),
  //     endDate:  leave.endDate.substring(0,10),
  //     reason:  leave.reason
  //   });
  //   // this.leaveUpdateForm.controls['reason'].setValue(leave.reason);
  //   // this.leaveUpdateForm.get('startDate').setValue('2019-09-07');
  //   // this.leaveUpdateForm.get('startDate').setValue('2019-09-08');
  //   // console.log("updated - ",this.leaveUpdateForm.controls['startDate'].value);
  //   this.renderer.addClass(document.body, 'modal-open');
  //   this.renderer.setStyle(document.body, 'overflow-y', 'auto');
  //   this.leaveModal.nativeElement.className = 'modal fade show';
  //   this.leaveModal.nativeElement.style.display = 'block';
  //   this.leaveModal.nativeElement.style.paddingRight = '17px';
    
  // }

  // closeModal () {
  //   this.renderer.addClass(document.body, 'modal-open');
  //   this.leaveModal.nativeElement.className = 'modal fade';
  //   this.leaveModal.nativeElement.style.display = 'none';
  //   this.leaveModal.nativeElement.style.paddingRight = '';
  // }

  // onSubmit () {
  //   const leaveUpdateFormData = this.leaveUpdateForm.value;
  //   console.log("end date",leaveUpdateFormData.endDate);
  //   const leave: Leave = {
  //     "endDate": new Date(leaveUpdateFormData.endDate).toISOString(),
  //     "startDate": new Date(leaveUpdateFormData.startDate).toISOString(),
  //     "reason":  leaveUpdateFormData.reason,
  //     "userId":  '4eb6e7e7e9b7f4194e000001'
  //   }
  //   this.leaveUpdateForm.reset();
  //   this.submitted = true;
  //   this.leavesDataService.postLeave(leave).subscribe(
  //     () => {
  //       setTimeout( () => { this.saved = true; }, 1000 );
  //       // this.saved = true;
  //       this.posted.emit();
  //     },
  //     (err) => console.log(err),
  //     () => console.log("Completed")
  //   );
  // }

  launchModal (leave) {
    console.log('here2',leave);
    this.leavesModalService.emitNewSubmittedStatus(false);
    this.leavesModalService.emitEditSubmittedStatus(false);
    this.leavesModalService.emitDeleteSubmittedStatus(false);
    this.leavesModalService.emitSavedStatus(false);
    this.leavesModalService.emitUpdatedStatus(false);
    this.leavesModalService.emitDeletedStatus(false);
    this.leavesModalService.emitModeVal('edit');
    this.leavesModalService.emitLeaveData(leave);
    this.leavesModalService.setLeaveIdToEdit(leave._id);
    $('#leaveModal').modal('toggle');
  }

  launchDeleteModal (leaveId) {
    console.log('here3');
    this.leavesModalService.emitNewSubmittedStatus(false);
    this.leavesModalService.emitEditSubmittedStatus(false);
    this.leavesModalService.emitDeleteSubmittedStatus(false);
    this.leavesModalService.emitSavedStatus(false);
    this.leavesModalService.emitUpdatedStatus(false);
    this.leavesModalService.emitDeletedStatus(false);
    this.leavesModalService.emitModeVal('delete');
    this.leavesModalService.setLeaveIdToEdit(leaveId);
    $('#leaveModal').modal('toggle');
  }
}
