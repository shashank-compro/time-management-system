import { Component, OnInit } from '@angular/core';
import { faTachometerAlt , faClock, faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation-left',
  templateUrl: './navigation-left.component.html',
  styleUrls: ['./navigation-left.component.scss']
})
export class NavigationLeftComponent implements OnInit {
  faTachometerAlt = faTachometerAlt;
  faClock = faClock;
  faCalendar = faCalendar;

  constructor() { }

  ngOnInit() {
  }

}
