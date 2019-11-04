import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss']
})
export class LeavesComponent implements OnInit {
  updateRequired: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  sendUpdateRequest () {
    console.log("in leavePosted");
    this.updateRequired = !this.updateRequired;
  }

}
