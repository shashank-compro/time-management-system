import { Component, OnInit } from '@angular/core';
import { LeavesDataService } from '../leaves/leaves-data.service';
import { HolidayList } from '../../models/holiday-data';
import { Leave } from '../leaves/leave.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  leavesList:Leave[];
  leavesListLength:number;
  holidayList;
  updated:boolean;

  constructor(private leavesDataService: LeavesDataService) { }

  ngOnInit() {
    // this.createForm();
    this.leavesDataService.getLeaves().subscribe((data) => {
      this.leavesList = data;
      this.leavesListLength = data.length; 
      setTimeout( () => { this.updated = true; }, 250 );
    });
    this.holidayList = HolidayList;
   
    
  }

  ngOnChanges() {
    this.leavesDataService.getLeaves().subscribe((data) => {
      this.leavesList = data;
      console.log("In ngonchanges - ",this.leavesList);
    })
  }


}
