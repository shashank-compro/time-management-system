import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LeavesModalService } from '../leaves-modal.service';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';
declare var $;

@Component({
  selector: 'app-leaves-form',
  templateUrl: './leaves-form.component.html',
  styleUrls: ['./leaves-form.component.css']
})
export class LeavesFormComponent implements OnInit {
  leavesForm: FormGroup;
  submitted: boolean = false;
  saved: boolean = false;
  faAlignJustify = faAlignJustify;

  // @Output() posted = new EventEmitter<boolean>();

  constructor(private leavesModalService: LeavesModalService) { }

  ngOnInit() {
    // this.createForm();
  }

  // createForm() {
  //   this.leavesForm = new FormGroup({
  //       'startDate' : new FormControl(null, [
  //             Validators.required]),
  //       'endDate' : new FormControl(null, [
  //             Validators.required]),
  //       'reason' : new FormControl(null, [
  //             Validators.required]) 
  //   }, this.compareDates);
  // }

  // onSubmit () {
  //   const leavesFormData = this.leavesForm.value;
  //   console.log("end date",leavesFormData.endDate);
  //   const leave: Leave = {
  //     "endDate": new Date(leavesFormData.endDate).toISOString(),
  //     "startDate": new Date(leavesFormData.startDate).toISOString(),
  //     "reason":  leavesFormData.reason,
  //     "userId":  '4eb6e7e7e9b7f4194e000001'
  //   }
  //   this.leavesForm.reset();
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

  // compareDates (controls: AbstractControl): {[key: string]: any} {
  //   const startDate = controls.get(['startDate']).value;
  //   const endDate = controls.get(['endDate']).value;
  //   if (startDate!== null && endDate !== null && new Date(startDate) >= new Date(endDate)) {
  //     return {datesError:true}
  //   }
  //   return null;
  // }

  // setDefaultModal () {
  //   this.saved = false;
  //   this.submitted = false;
  // } 

  launchModal () {
    console.log("here1");
    this.leavesModalService.emitNewSubmittedStatus(false);
    this.leavesModalService.emitEditSubmittedStatus(false);
    this.leavesModalService.emitDeleteSubmittedStatus(false);
    this.leavesModalService.emitSavedStatus(false);
    this.leavesModalService.emitUpdatedStatus(false);
    this.leavesModalService.emitDeletedStatus(false);
    this.leavesModalService.emitModeVal('new');
    $('#leaveModal').modal('toggle');

  }
}
