import { Injectable } from '@angular/core';
import { Observable, of as observableOf, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  [x: string]: any;

  constructor() {}

  private toggle = new Subject<boolean>();
  
   setToggle(toggle){
       this.toggle.next(toggle);
   }

  getToggle(): Observable<any> {
    return this.toggle.asObservable();
  }

}
