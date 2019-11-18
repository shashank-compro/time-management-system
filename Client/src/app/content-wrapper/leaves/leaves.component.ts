import { Component, OnInit } from '@angular/core';
import { LeavesDataService } from './leaves-data.service';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss']
})
export class LeavesComponent implements OnInit {
  [x: string]: any;
  updated:boolean;
  updateRequired: boolean = false;

  constructor(private leavesDataService : LeavesDataService) { }

  ngOnInit() {
    this.subscription = this.leavesDataService.getLeavesLoaded().subscribe(
      value => {
        setTimeout( () => { this.updated = value;},250)
      });
  }

  sendUpdateRequest () {
    console.log("in leavePosted");
    this.updateRequired = !this.updateRequired;
  }

}
