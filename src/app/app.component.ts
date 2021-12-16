import { Component } from '@angular/core';
import { NavbarService } from './service/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lms-frontend';

  constructor(public nav : NavbarService){
    
  }
}
