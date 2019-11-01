import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { timeEntry } from '../../models/timeentry';
import { timeEntryWithEntryId } from '../../models/timeentrywithentryid'
import { HttpClient, HttpHeaders, HttpParams    } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TimeentriesService {


  //POST
  timeEntriesURL = 'https://comprotms.herokuapp.com/api/v1/timeentries';
 // timeEntriesURL = 'http://localhost:3000/api/v1/timeentries';


  createTimeEntry(timeEntry: timeEntry): Observable<timeEntryWithEntryId> {
    var token = this.getUserPayload().tokenPayload.token;
    let headers = new HttpHeaders().set('authorization', token);
    return this.http.post<timeEntryWithEntryId>(this.timeEntriesURL, timeEntry,{headers: headers});

  }

  getUserPayload(){
    return  JSON.parse(localStorage.getItem('userPayload')); 
    }

  //GET
  getTimeEntries() : Observable<timeEntryWithEntryId[]>{
    //NEED TO REPLACE WITH TOKEN PAYLOAD ID
    var userPayloadID = this.getUserPayload().tokenPayload.payload.id
    var token = this.getUserPayload().tokenPayload.token;
    let headers = new HttpHeaders().set('authorization', token);
     return this.http.get<timeEntryWithEntryId[]>(this.timeEntriesURL+ `?user=${userPayloadID}&limit=6`,{headers: headers});
  }

//PUT
  updateTimeEntry(timeEntry: timeEntry, entryId: string): Observable<timeEntryWithEntryId> {
    var token = this.getUserPayload().tokenPayload.token;
    let headers = new HttpHeaders().set('authorization', token);
    return this.http.put<timeEntryWithEntryId>(this.timeEntriesURL+ `/${entryId}`, timeEntry,{headers: headers});

  } 

  constructor(private http: HttpClient) { 
    
  }

}
