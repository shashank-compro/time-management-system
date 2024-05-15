import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userDetails : any = {};
  

  constructor(private http: HttpClient) { }
  
  addUser(user : User) : Observable<User> {
    return this.http.post<User>('http://localhost:3000/api/v1/users/login',user, httpOptions);
  }

  getUserDetails(userPayload) {
    this.userDetails = userPayload;
    // localStorage.setItem('userPayload',JSON.stringify(userPayload));
  }

  setUserDetails() {
    return this.userDetails.tokenPayload.payload.firstname;
    // var userToken = JSON.parse(localStorage.getItem('userPayload'));
    // return userToken.tokenPayload.payload.firstname;
  }

  deleteUser() {debugger;
    this.userDetails =  {};
    // localStorage.removeItem('userPayload');
  }
}
