import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  faEnvelope = faEnvelope;
  faKey = faKey;
  user: User[];
  submitted = false;
  showErrorMessage = false; 
  userDetails = {};

  loginForm = new FormGroup ({
    email : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  })

  constructor(private userService : UserService, private router: Router) { }
  
  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    if(this.loginForm.invalid) {
      return;
    }

    this.userService.addUser(this.loginForm.value)
    .subscribe({
      next : user => {
        this.userService.getUserDetails(user);
        if(user) {
          this.router.navigate(['/app/dashboard']);
        }
      },
      error : err => {
        this.showErrorMessage = true;
        this.router.navigate(['/']);
      }
    })
  }

}
