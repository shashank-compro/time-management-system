import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Leave } from './leave.model';

@Injectable({
  providedIn: 'root'
})
export class LeavesModalService {
  mode = new Subject<string>();
  leaveFormData = new Subject<Leave>();
  newSubmitted = new Subject<boolean>();
  editSubmitted = new Subject<boolean>();
  deleteSubmitted = new Subject<boolean>();
  saved = new Subject<boolean>();
  updated = new Subject<boolean>();
  deleted = new Subject<boolean>();
  leaveId;

  constructor() { }

  emitModeVal (mode) {
    this.mode.next(mode);
  }

  emitLeaveData (leave: Leave) {
    this.leaveFormData.next(leave);
  }

  emitNewSubmittedStatus (status: boolean) {
    this.newSubmitted.next(status);
  } 

  emitEditSubmittedStatus (status: boolean) {
    this.editSubmitted.next(status);
  } 

  emitDeleteSubmittedStatus (status: boolean) {
    this.deleteSubmitted.next(status);
  } 

  emitSavedStatus (status: boolean) {
    this.saved.next(status);
  } 

  emitUpdatedStatus (status: boolean) {
    this.updated.next(status);
  }
  
  emitDeletedStatus (status: boolean) {
    this.deleted.next(status);
  }

  setLeaveIdToEdit (leaveId) {
    this.leaveId = leaveId;
  }

  getLeaveIdToEdit () {
    return this.leaveId;
  }
}
