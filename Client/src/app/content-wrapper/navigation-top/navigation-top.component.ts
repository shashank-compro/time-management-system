import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-navigation-top',
  templateUrl: './navigation-top.component.html',
  styleUrls: ['./navigation-top.component.scss']
})
export class NavigationTopComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;
  firstname: string = "";

  constructor(private userService : UserService, private router : Router) { }

  ngOnInit() {
    this.firstname = this.userService.setUserDetails();
  }

  onLogout() {
    this.router.navigate(['/']);
    this.userService.deleteUser();
  }

}
