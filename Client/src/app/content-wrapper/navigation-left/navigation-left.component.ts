import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { faHome , faClock, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation-left',
  templateUrl: './navigation-left.component.html',
  styleUrls: ['./navigation-left.component.scss']
})
export class NavigationLeftComponent implements OnInit {
  
  
  faHome = faHome;
  faClock = faClock;
  faCalendar = faCalendar;

  constructor(private toggleIt : CommonService) { }

  toggleSidebar: boolean = false;
  private subscription: Subscription;

    
  ngOnInit() {
     this.subscription = this.toggleIt.getToggle().subscribe(
         value => {
          this.toggleSidebar = value;
         });
    
  }

}
