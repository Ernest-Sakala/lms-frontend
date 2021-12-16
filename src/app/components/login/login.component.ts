import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/service/navbar.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(public nav : NavbarService,private userService : UserService, private router : Router) { 
    nav.hide();
  }

  ngOnInit(): void {
  }


  loginUser(data : any){
    this.userService.login(data).subscribe( response => {
      
    });
  }

}
