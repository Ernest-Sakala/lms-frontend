import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/model/user-model';
import { NavbarService } from 'src/app/service/navbar.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


   durationInSeconds = 5;
  danger : boolean = true;
  loading : boolean = false;
  submitted: boolean = false;


  constructor(public nav : NavbarService,private userService :UserService, private _snackBar: MatSnackBar, private router : Router ) { 
    nav.show();
  }

  ngOnInit(): void {
  }


  registerUser(data: any){ 

    this.loading = true;
    data.roles = [{
      "id" : 2,
      "name" : "ROLE_CLIENT"
    }];

    

    this.userService.register(data).subscribe((response : UserModel) => {
      console.log(response);

      this.loading = false;

      this.danger = false

      this.userService.registerSuccess = true

      this.router.navigateByUrl(`/register/application-info/${response.id}`)

      this.openSnackBar("You have successfully Registered");
    }, (error : HttpErrorResponse) => {

      this.loading = false
      this.userService.registerSuccess = false
      
      this.openSnackBar(error.message)
    });

  }



  
   openSnackBar(message : string) {

    const configureSnackBar = new MatSnackBarConfig();
      configureSnackBar.duration = 5000;
      configureSnackBar.horizontalPosition = 'center';
      configureSnackBar.verticalPosition = 'bottom';
      configureSnackBar.panelClass = this.danger? 'snackbar-danger' : 'snackbar-success';

      this._snackBar.open(message, undefined, configureSnackBar);
    }

}
