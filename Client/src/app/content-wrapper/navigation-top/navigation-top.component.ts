import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle} from '@fortawesome/free-solid-svg-icons';
import { CommonService } from '../../services/common.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-navigation-top',
  templateUrl: './navigation-top.component.html',
  styleUrls: ['./navigation-top.component.scss']
})

export class NavigationTopComponent implements OnInit {
  @Input() disableToggle;
  faBars = faBars
  faUser = faUserCircle;
  firstname: string = "";
  
  
  toggle:boolean;
  subscription: Subscription;
  constructor(private userService : UserService, private router : Router, private toggleIt: CommonService) { }

  ngOnInit() {
    this.firstname = this.userService.setUserDetails();
    this.subscription = this.toggleIt.getToggle().subscribe(
      value => {
       this.toggle = value;
      });
  }

  toggleSidebar(){
    if(this.toggle)
     this.toggleIt.setToggle(false);
     else
        this.toggleIt.setToggle(true);
  }

  onLogout() {
    this.router.navigate(['/login']);
    this.userService.deleteUser();
  }

}
