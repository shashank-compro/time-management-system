import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

   toggle : boolean = false;

  isToggled(taggle: boolean){
    this.toggle = taggle;
  }
}
