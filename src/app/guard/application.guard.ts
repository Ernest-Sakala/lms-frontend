import { Injectable } from '@angular/core';
import {  CanActivate, Router, RouterOutletContract } from '@angular/router';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationGuard implements CanActivate {
 
  constructor(public userService: UserService,public router:Router) {

  }

  canActivate() : boolean {

    if(this.userService.registered()){

      return true;
    }else{
    
      this.router.navigate(['/register'])
      return false;
    }
    
  }

  

}
