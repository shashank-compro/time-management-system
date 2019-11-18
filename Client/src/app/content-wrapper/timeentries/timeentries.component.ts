import { Component, OnInit } from '@angular/core';
import { timeEntryWithEntryId } from '../../models/timeentrywithentryid'
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { TimeentriesService } from '../../services/timeentries/timeentries.service';

@Component({
  selector: 'app-timeentries',
  templateUrl: './timeentries.component.html',
  styleUrls: ['./timeentries.component.scss']
})
export class TimeentriesComponent implements OnInit {
  [x: string]: any;

  constructor(private timeentryservice : TimeentriesService) { }
  timeEntryForm:boolean;
  timeEntryTable:boolean;
  updated:boolean
  faCoffee = faCoffee;
  ngOnInit() {
    
    //setTimeout( () => { this.timeEntryForm = true; }, 1000 );
    this.subscription = this.timeentryservice.getTimeEntryLoaded().subscribe(
        value => {
         this.timeEntryForm = value;
        });
    this.subscription = this.timeentryservice.getTimeEntryTableLoaded().subscribe(
      value => {
        setTimeout( () => { this.timeEntryTable = value; }, 250 );
         // this.timeEntryTable = value;
          });    
  }
  ngAfterViewInit(){
    // setTimeout( () => { this.timeEntryForm = true; }, 1000 );
    // this.subscription = this.timeentryservice.getTimeEntryLoaded().subscribe(
    //   value => {
    //    this.timeEntryForm = value;
    //   });

   
  }
  
  todaysEntryObject: any;

  receiveTodaysEntry($event) {
    
    this.todaysEntryObject = $event;
  }

}
