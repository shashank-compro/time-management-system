import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { UserDetails } from '../models/user-details';

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
    
    return this.http.post<User>('https://comprotms.herokuapp.com/api/v1/users/login',user, httpOptions);
    //return this.http.post<User>('http://localhost:3000/api/v1/users/login',user, httpOptions);
  }

  updateUserDetails(userdetails:UserDetails,userId: string): Observable<UserDetails>{
    return this.http.put<UserDetails>(`http://localhost:3000/api/v1/users/${userId}`,userdetails,  httpOptions);
  }

  getUserDetails(userPayload) {
    
    this.userDetails = userPayload;
    localStorage.setItem('userPayload',JSON.stringify(userPayload));
  }

  setUserDetails() {
    if(Object.keys(this.userDetails).length !== 0)
    return this.userDetails.tokenPayload.payload.firstname;
    else{
      var userToken = JSON.parse(localStorage.getItem('userPayload'));
       return userToken.tokenPayload.payload.firstname;
    }
    // var userToken = JSON.parse(localStorage.getItem('userPayload'));
    // return userToken.tokenPayload.payload.firstname;
  }

  isLoggedIn() {
    var userToken = JSON.parse(localStorage.getItem('userPayload'));
    if(Object.keys(this.userDetails).length !== 0)
    return true;

    else if(userToken)
    return true;

    else
    return false;
    
  }

  deleteUser() {
    this.userDetails =  {};
    localStorage.removeItem('userPayload');
  }
}
