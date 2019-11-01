
import { Component, OnInit, Input,  Output, EventEmitter } from '@angular/core';
import { timeEntry } from '../../../models/timeentry';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { timeEntryWithEntryId } from '../../../models/timeentrywithentryid'
import { TimeentriesService } from '../../../services/timeentries/timeentries.service';
import { faEdit }  from '@fortawesome/free-solid-svg-icons';
import { TimeentriesFormComponent } from '../timeentries-form/timeentries-form.component'
import * as moment from 'moment';
import { TimeentriesModalService } from '../timeentries-modal.service'
import {NgModule}      from '@angular/core';
import { ngContentDef } from '@angular/core/src/view';
declare var $ : any;




@Component({
  selector: 'app-timeentries-modal',
  templateUrl: './timeentries-modal.component.html',
  styleUrls: ['./timeentries-modal.component.css']
})
export class TimeentriesModalComponent implements OnInit {

  formTitle: string;
  timeEntriesAndUpdateForm: FormGroup;
  timeEntriesMode: string;
  entry: timeEntry;
  todaysEntryCheck: boolean;

  constructor(private timeentriesModalService: TimeentriesModalService, private timeEntriesService: TimeentriesService) {}

  @Output() todaysEntryObject = new EventEmitter<any>();

  launchModal (){
    $('#timeEntryUpdateModal').modal('show')
  }
  ngContentDef(){
    
  }
  ngOnChanges() {}

  ngOnInit() {

    //fetch form input
    this.timeEntriesAndUpdateForm = new FormGroup({
        'timeIn': new FormControl(null, [
          Validators.required,
          Validators.pattern('([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?')
        ]),
        'timeOut': new FormControl(null, [
          Validators.required,
          Validators.pattern('([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?')
        ]),
        'onLeave': new FormControl(false)

    });

    //subscribing to mode check
    this.timeentriesModalService.timeEntriesModeObservable.subscribe((mode: string) => {

      //set mode
      this.timeEntriesMode = mode;
      //Update Heading
      this.formTitle= (mode === 'new-entry') ? 'Time Entry Form' : 'Time Update Form';


      //Prefill

       //show modal
       this.launchModal();

      //Submit

    });  

    this.timeentriesModalService.prefillFormObservable.subscribe((timeEntry: any) => {
      
      this.timeEntriesAndUpdateForm.setValue({
        timeIn: moment(timeEntry.timeIn, ["h:mm A"]).format("HH:mm"),
        timeOut: moment(timeEntry.timeOut, ["h:mm A"]).format("HH:mm"),
        onLeave: timeEntry.onLeave
      })

    });
  
}

onSubmit() {
  switch (this.timeEntriesMode){
    case 'new-entry':
      this.onNewEntrySubmit();
      break;
    case 'update-entry':
      this.onUpdateEntrySubmit();
      break;
  }
}
onNewEntrySubmit(){

    if (this.timeEntriesAndUpdateForm.status === 'VALID') {

        var entryFormGroupObject = this.timeEntriesAndUpdateForm.value;
        this.entry = this.formatNewTimeEntry(entryFormGroupObject);

      //check if today's entry already done

        this.timeEntriesService.createTimeEntry(this.entry)
          .subscribe((timeEntry) => {
            this.todaysEntryObject.emit(timeEntry);
          });
      }

    
}

onUpdateEntrySubmit(){

  if (this.timeEntriesAndUpdateForm.status === 'VALID') {

    var entryFormGroupObject = this.timeEntriesAndUpdateForm.value;
    this.entry = this.formatNewTimeEntry(entryFormGroupObject);

    this.timeEntriesService.updateTimeEntry(this.entry, this.timeentriesModalService.getTimeEntryId())
      .subscribe((timeEntry) => {

        //sending to parent
       this.todaysEntryObject.emit(timeEntry);
      });
  }

  
}

getUserPayload(){
return  JSON.parse(localStorage.getItem('userPayload')); 
}


formatNewTimeEntry(entryFormGroupObject) {

  var dateToday = moment(new Date()).format('YYYY/MM/DD');
  console.log(dateToday)
  var userPayloadID = this.getUserPayload().tokenPayload.payload.id;

  
  return {
    //need to update user id from Ashmeet's variable of user
    //userId: '5d7f74cfd211a424ac7abcae',
    userId : userPayloadID,
    date: dateToday,
    timeIn: entryFormGroupObject.timeIn,
    timeOut: entryFormGroupObject.timeOut,
    onLeave: entryFormGroupObject.onLeave
  }
}

}
