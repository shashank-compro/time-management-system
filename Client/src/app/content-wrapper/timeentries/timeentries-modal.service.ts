import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeentriesModalService {

  timeEntriesMode: string;
  timeEntryId: string;
  public timeEntriesModeObservable = new Subject<string>();
  public prefillFormObservable = new Subject<string>();
  public todaysEntryCheckObservable = new Subject<string>();
  constructor() { }

  setTimeEntriesMode(mode) {
    this.timeEntriesModeObservable.next(mode);
  }

  getTimeEntriesMode(): Observable<any> {
    return of(this.timeEntriesMode);
  }

  prefillEditForm(timeEntry) {
    this.prefillFormObservable.next(timeEntry);
  }

  setTimeEntryId(entryId) {
    this.timeEntryId = entryId;
  }

  getTimeEntryId() {
    return this.timeEntryId
  }

  setTodaysEntryCheck(check) {
    this.todaysEntryCheckObservable.next(check);
  }
}
