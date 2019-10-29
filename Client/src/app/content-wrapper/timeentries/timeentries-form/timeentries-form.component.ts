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
  todaysEntryCheck: string;
  updated: boolean= false;

  constructor(private timeEntriesService: TimeentriesService, private timeentriesModalService: TimeentriesModalService) {}

  ngOnInit() {
    //subscribing to todaysentrycheck-HERE
    this.timeentriesModalService.todaysEntryCheckObservable.subscribe((check: string) => {

      this.todaysEntryCheck = check;
      //loader
      setTimeout( () => { this.updated = true; }, 1000 );
    });

  }

  formatTimeEntry(entryFormGroupObject) {

    var dateToday = moment(new Date()).format('YYYY/MM/DD');
    console.log(dateToday)
    return {
      //need to update user id from Ashmeet's variable of user
      userId: '5d7f74cfd211a424ac7abcae',
      date: dateToday,
      timeIn: this.convertToMinutes(entryFormGroupObject.timein),
      timeOut: this.convertToMinutes(entryFormGroupObject.timeout),
      onLeave: this.convertToMinutes(entryFormGroupObject.onleave)
    }
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

  setTimeEntriesMode(mode) {
      this.timeentriesModalService.setTimeEntriesMode(mode);
    }
  }

