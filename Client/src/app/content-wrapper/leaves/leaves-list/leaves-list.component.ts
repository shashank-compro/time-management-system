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


  @Input() updateRequired;

  constructor(private leavesDataService: LeavesDataService, private leavesModalService: LeavesModalService) { }

  ngOnInit() {

    this.leavesDataService.getLeaves().subscribe((data) => {
 
     this.leavesList = data;
     this.leavelistLength = data.length;
      this.leavesDataService.setLeavesLoaded(true);
    });

  }

  ngOnChanges() {
    this.leavesDataService.getLeaves().subscribe((data) => {
      this.leavesList = data;
     
    })
  }


  launchModal (leave) {
   
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
