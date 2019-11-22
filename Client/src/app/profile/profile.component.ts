import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private userservice:UserService) { }

  disableToggle:boolean = true;
  updated:boolean = false;
  faCheck = faCheck;
  getUserPayload(){
    return  JSON.parse(localStorage.getItem('userPayload')); 
    }
    
  profileForm = new FormGroup({
    firstname: new FormControl(this.getUserPayload().tokenPayload.payload.firstname, Validators.required),
    lastname: new FormControl(this.getUserPayload().tokenPayload.payload.lastname,Validators.required),
    email: new FormControl({value: this.getUserPayload().tokenPayload.payload.email, disabled: true},[Validators.required, Validators.email]),
  });

  onSubmit(data){
   
    if(data.status=="VALID"){
        this.userservice.updateUserDetails(data.value,this.getUserPayload().tokenPayload.payload.id)
        .subscribe(()=>{
            this.updated = true;
            setTimeout( () => { this.updated = false; }, 2500 );
        })

          var userData = this.getUserPayload();
           userData.tokenPayload.payload.firstname = data.value.firstname; 
           userData.tokenPayload.payload.lastname = data.value.lastname; 
           this.userservice.getUserDetails(userData);   
    }

  }

  

  ngOnInit() {
  
    
  }

}
