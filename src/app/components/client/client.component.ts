import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/service/navbar.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

 

  isCollapsed = false
 

  constructor(public nav : NavbarService,private router : Router) {
      this.nav.hide()
  }

  ngOnInit(): void {
   
  }

  logout(){
    localStorage.removeItem("token")
    this.router.navigateByUrl("/login")
  }

}
