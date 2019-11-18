import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Leave } from './leave.model';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeavesDataService {

 // baseUrl = "http://localhost:3000/api/v1/leaves";
  baseUrl = "https://comprotms.herokuapp.com/api/v1/leaves";
 

  httpOptions = {
    headers: new HttpHeaders({
     'Content-Type':  'application/json',
     'authorization' :  this.getUserPayload().tokenPayload.token
   })
 };

  constructor(private http: HttpClient) { }

  getUserPayload(){
    return  JSON.parse(localStorage.getItem('userPayload')); 
    }

  getLeaves ()  :Observable<Leave[]> {
    return this.http.get<Leave[]>(this.baseUrl + `?user=${this.getUserPayload().tokenPayload.payload.id}`, this.httpOptions);
  }

  postLeave (leave: Leave): Observable<Leave> {
    return this.http.post<Leave>(this.baseUrl, leave, this.httpOptions).pipe(
      tap((leave: Leave) => console.log("leave added")));

  }

  updateLeave (leave: Leave, leaveId): Observable<Leave> {
    return this.http.put<Leave>(this.baseUrl + '/' + leaveId, leave, this.httpOptions).pipe(
      tap((leave: Leave) => console.log("leave updated")));
  }

  deleteLeave (leaveId): Observable<Leave> {
    return this.http.delete<Leave>(this.baseUrl + '/' + leaveId, this.httpOptions).pipe(
      tap((leave: Leave) => console.log("leave deleted")));
  }


  private leavesLodaed = new Subject<boolean>();
  
  setLeavesLoaded(toggle){
      this.leavesLodaed.next(toggle);
  }

 getLeavesLoaded(): Observable<any> {
   return this.leavesLodaed.asObservable();
 }
}
