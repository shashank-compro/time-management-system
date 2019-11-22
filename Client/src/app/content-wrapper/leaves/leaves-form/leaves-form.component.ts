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

  

  constructor(private leavesModalService: LeavesModalService) { }

  ngOnInit() {
   
  }


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
