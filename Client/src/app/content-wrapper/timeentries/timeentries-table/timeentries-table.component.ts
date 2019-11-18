import { Component, OnInit, Input } from '@angular/core';
import { timeEntry } from '../../../models/timeentry';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { timeEntryWithEntryId } from '../../../models/timeentrywithentryid'
import { TimeentriesService } from '../../../services/timeentries/timeentries.service';
import { faEdit }  from '@fortawesome/free-solid-svg-icons';
import { TimeentriesFormComponent } from '../timeentries-form/timeentries-form.component'
import { TimeentriesModalService } from '../timeentries-modal.service'
import * as moment from 'moment';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-timeentries-table',
  templateUrl: './timeentries-table.component.html',
  styleUrls: ['./timeentries-table.component.scss']
})
export class TimeentriesTableComponent implements OnInit {

  constructor(private timeEntriesService: TimeentriesService, private timeentriesModalService: TimeentriesModalService) {}
  entry: timeEntry;
  timeEntryWithEntryId: timeEntryWithEntryId[];
  timeEntryResponseLength: number;
  faEdit = faEdit;
  timeEntryUpdateForm: FormGroup;
  todaysEntryCheck: boolean = false;
  updated: boolean= false;
  faCircle = faCircle;

  @Input() todaysEntryObject: any;

  ngOnInit() {

    //Get entries
    this.timeEntriesService.getTimeEntries().subscribe((timeEntries) => {
      
      this.timeEntryWithEntryId = timeEntries;
      //to be used in html
      this.timeEntryResponseLength = timeEntries.length;
      //sanitize content to display
      this.timeEntryWithEntryId = this.sanitizeEntries(this.timeEntryWithEntryId);
      this.updated = true;
      //Loader
      this.timeEntriesService.setTimeEntryTableLoaded(true);
      
      //setTimeout( () => { this.updated = true; }, 1000 );
    });
  }

  getTodaysEntryCheck(entries) {

    var entryDate = new Date(entries[0].date).toDateString();
    return (entryDate == new Date().toDateString());
  }

  ngOnChanges() {

    //subscribe to GET whenever new POST is made // dynamic update
    this.timeEntriesService.getTimeEntries().subscribe((timeEntries) => {
      this.timeEntryWithEntryId = timeEntries;

      //check today's time entered already, send response to form button to deactivate
      this.todaysEntryCheck = this.getTodaysEntryCheck(this.timeEntryWithEntryId);
      this.timeentriesModalService.setTodaysEntryCheck(this.todaysEntryCheck);

      //santize the entries to display
      this.timeEntryWithEntryId = this.sanitizeEntries(this.timeEntryWithEntryId);

    });
  }

  sanitizeEntries(timeEntries) {

    for (var entry in timeEntries) {

       // //check if today's date
       if ( entry === '0' && this.todaysEntryCheck) {
        timeEntries[entry].isToday = true;
      }
      timeEntries[entry].date = new Date(timeEntries[entry].date).toDateString();
      timeEntries[entry].timeIn = this.sanitizeTime(timeEntries[entry].timeIn);
      timeEntries[entry].timeOut = this.sanitizeTime(timeEntries[entry].timeOut);
    }
    return timeEntries;
  }

  sanitizeTime(timeStringInMinutes) {

    var time = timeStringInMinutes;
    var hours = Math.floor(time / 60);
    var minutes = time - (hours * 60);
    return moment().hours(hours).minutes(minutes).format('LT');
  }

  setTimeEntriesMode(mode, timeEntry) {

    this.timeentriesModalService.setTimeEntriesMode(mode);
    this.timeentriesModalService.prefillEditForm(timeEntry);
    this.timeentriesModalService.setTimeEntryId(timeEntry._id);
  }
}