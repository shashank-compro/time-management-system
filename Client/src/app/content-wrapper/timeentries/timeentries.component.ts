import { Component, OnInit } from '@angular/core';
import { timeEntryWithEntryId } from '../../models/timeentrywithentryid'
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { TimeentriesService } from '../../services/timeentries/timeentries.service';
import { TimeentriesModalService } from './timeentries-modal.service';

@Component({
  selector: 'app-timeentries',
  templateUrl: './timeentries.component.html',
  styleUrls: ['./timeentries.component.scss']
})
export class TimeentriesComponent implements OnInit {
  [x: string]: any;

  constructor(private timeentryservice : TimeentriesService, private timeentriesModalService: TimeentriesModalService) {}
  timeEntryForm:boolean;
  timeEntryTable:boolean;
  timeEntryWithEntryId: timeEntryWithEntryId[];
  todaysEntry :any[];
  todaysEntryCheck:boolean;
  updated:boolean
  faCoffee = faCoffee;
  ngOnInit() {
    this.subscription = this.timeentryservice.getTodaysEntry().subscribe(
      value => {
       this.todaysEntry = value;});
 

    this.timeentriesModalService.todaysEntryCheckObservable.subscribe((check: boolean) => {
      this.todaysEntryCheck = check; 
    });

    
    this.subscription = this.timeentryservice.getTimeEntryLoaded().subscribe(
        value => {
         this.timeEntryForm = value;
        });
    this.subscription = this.timeentryservice.getTimeEntryTableLoaded().subscribe(
      value => {
        setTimeout( () => { this.timeEntryTable = value; }, 250 );
          });    
  }
  ngAfterViewInit(){


   
  }

  
  todaysEntryObject: any;

  receiveTodaysEntry($event) {
    
    this.todaysEntryObject = $event;
  }

}
