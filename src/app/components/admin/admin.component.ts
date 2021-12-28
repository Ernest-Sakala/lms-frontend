import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/service/navbar.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isCollapsed = false
 

  constructor(public nav : NavbarService, private router : Router) {
      this.nav.hide()
  }

  ngOnInit(): void {
   
  }


  logout(){
    localStorage.removeItem("token")
    this.router.navigateByUrl("/login")
  }
 

}
