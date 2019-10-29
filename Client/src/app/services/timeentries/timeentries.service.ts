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
  timeEntriesURL = 'http://localhost:3000/api/v1/timeentries';

  createTimeEntry(timeEntry: timeEntry): Observable<timeEntryWithEntryId> {
 
    return this.http.post<timeEntryWithEntryId>(this.timeEntriesURL, timeEntry);

  }

  //GET
  getTimeEntries() : Observable<timeEntryWithEntryId[]>{
    //NEED TO REPLACE WITH TOKEN PAYLOAD ID
    return this.http.get<timeEntryWithEntryId[]>(this.timeEntriesURL+ '?user=5d7f74cfd211a424ac7abcae&limit=6');
  }

//PUT
  updateTimeEntry(timeEntry: timeEntry, entryId: string): Observable<timeEntryWithEntryId> {
 
    return this.http.put<timeEntryWithEntryId>(this.timeEntriesURL+ `/${entryId}`, timeEntry);

  } 

  constructor(private http: HttpClient) { }
}
