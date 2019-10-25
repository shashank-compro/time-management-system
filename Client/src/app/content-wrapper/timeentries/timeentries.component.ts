import { Component, OnInit } from '@angular/core';
import { timeEntryWithEntryId } from '../../models/timeentrywithentryid'
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-timeentries',
  templateUrl: './timeentries.component.html',
  styleUrls: ['./timeentries.component.scss']
})
export class TimeentriesComponent implements OnInit {

  constructor() { }
  
  updated:boolean = true;
  faCoffee = faCoffee;
  ngOnInit() {
    

  }
  ngAfterViewInit(){
    // setTimeout( () => { this.updated = false; }, 0 );
  }
  
  todaysEntryObject: any;

  receiveTodaysEntry($event) {
    
    this.todaysEntryObject = $event;
  }

}
