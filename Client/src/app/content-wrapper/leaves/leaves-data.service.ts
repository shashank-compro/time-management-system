import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Leave } from './leave.model';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeavesDataService {

  baseUrl = "http://localhost:3000/api/v1/leaves";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getLeaves () {
    return this.http.get<Leave>(this.baseUrl + '?user=4eb6e7e7e9b7f4194e000001');
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
}
