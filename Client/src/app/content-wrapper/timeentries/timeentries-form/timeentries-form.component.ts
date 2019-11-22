import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { faClock }  from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { timeEntry } from '../../../models/timeentry';
import { timeEntryWithEntryId } from '../../../models/timeentrywithentryid'
import { TimeentriesService } from '../../../services/timeentries/timeentries.service';
import { TimeentriesModalComponent } from '../timeentries-modal/timeentries-modal.component'
import { TimeentriesModalService } from '../timeentries-modal.service'

import * as moment from 'moment';


@Component({ 
  selector: 'app-timeentries-form', 
  templateUrl: './timeentries-form.component.html',
  styleUrls: ['./timeentries-form.component.scss']
})

export class TimeentriesFormComponent implements OnInit {
  faClock = faClock;
  entry: timeEntry;
  timeentryform: FormGroup;
  currentEntryId: string = null;
  timeEntry: timeEntry;
  submitted: boolean = false;
  timeEntryWithEntryId: timeEntryWithEntryId[];
  todaysEntryCheck: boolean;
  updated: boolean= false;
  subscription: any;

  constructor(private timeEntriesService: TimeentriesService, private timeentriesModalService: TimeentriesModalService, private timeentryservice: TimeentriesService) {}

  ngOnInit() {
    //subscribing to todaysentrycheck-HERE
    this.timeentriesModalService.todaysEntryCheckObservable.subscribe((check: boolean) => {
      this.timeEntriesService.setTimeEntryLoaded(true);
      this.todaysEntryCheck = check;
      //loader
      this.updated = true;
    
    });
    this.subscription = this.timeentryservice.getTodaysEntry().subscribe(
      value => {
       this.timeEntry = value;});

  }

  formatTimeEntry(entryFormGroupObject) {

    var dateToday = moment(new Date()).format('YYYY/MM/DD');
    
    var userPayloadID = this.getUserPayload().tokenPayload.payload.id;
    return {
      userId : userPayloadID,
      date: dateToday,
      timeIn: this.convertToMinutes(entryFormGroupObject.timein),
      timeOut: this.convertToMinutes(entryFormGroupObject.timeout),
      onLeave: this.convertToMinutes(entryFormGroupObject.onleave)
    }
  }

  getUserPayload(){
    return  JSON.parse(localStorage.getItem('userPayload')); 
    }
  convertToMinutes(time) {

    //check if field not updated updated
    if (!time) return;
    let timeStringArray = time.split(':');
    //convert in minutes
    return parseInt(timeStringArray[0]) * 60 + parseInt(timeStringArray[1]);
}
 
setDefaultModal () {
    this.submitted = false;
  } 

  // setTimeEntriesMode(mode) {
  //     this.timeentriesModalService.setTimeEntriesMode(mode);
  //   }

  setTimeEntriesMode(mode, timeEntry) {
     this.timeentriesModalService.setTimeEntriesMode(mode);
     if(timeEntry){
      this.timeentriesModalService.prefillEditForm(timeEntry);
      this.timeentriesModalService.setTimeEntryId(timeEntry._id);
     }
     
    }
  }

