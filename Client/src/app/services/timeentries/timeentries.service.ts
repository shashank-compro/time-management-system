import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { timeEntry } from '../../models/timeentry';
import { timeEntryWithEntryId } from '../../models/timeentrywithentryid'
import { HttpClient, HttpHeaders, HttpParams    } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TimeentriesService {

  getUserPayload(){
    return  JSON.parse(localStorage.getItem('userPayload')); 
    }


  httpOptions = {
     headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'authorization' :  this.getUserPayload().tokenPayload.token
    })
  };

  //POST
  
  timeEntriesURL = 'https://comprotms.herokuapp.com/api/v1/timeentries';
  //timeEntriesURL = 'http://localhost:3000/api/v1/timeentries';


  createTimeEntry(timeEntry: timeEntry): Observable<timeEntryWithEntryId> {

    return this.http.post<timeEntryWithEntryId>(this.timeEntriesURL, timeEntry, this.httpOptions);

  }

 

  //GET
  getTimeEntries() : Observable<timeEntryWithEntryId[]>{
    //NEED TO REPLACE WITH TOKEN PAYLOAD ID
     return this.http.get<timeEntryWithEntryId[]>(this.timeEntriesURL+ `?user=${this.getUserPayload().tokenPayload.payload.id}&limit=6`, this.httpOptions);
  }

//PUT
  updateTimeEntry(timeEntry: timeEntry, entryId: string): Observable<timeEntryWithEntryId> {
    return this.http.put<timeEntryWithEntryId>(this.timeEntriesURL+ `/${entryId}`, timeEntry, this.httpOptions);

  } 

  constructor(private http: HttpClient) { 
    
  }

}
