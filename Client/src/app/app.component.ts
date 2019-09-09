import { Component } from '@angular/core';
import { LoginPageComponent } from '../app/login-page/login-page.component';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Time-Management-System';
  faCoffee = faCoffee;
}
