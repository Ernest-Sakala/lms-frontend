import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/service/navbar.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

durationInSeconds = 5;
  danger : boolean = true;
  loading : boolean = false;

  constructor(private nav : NavbarService, private service : UserService , private _snackBar: MatSnackBar, private router : Router ) { }

  ngOnInit(): void {
    this.nav.show()
  }

  loginUser(data : any){

    console.log(data);

    this.loading = true;

    this.service.login(data).subscribe(response => {

        this.loading = false;
        this.danger = false;
        console.log(response);

        localStorage.setItem('token', response.token)
        localStorage.setItem('role', response.roles[0])

        this.openSnackBar("You have successfully logged in");

        if(response.roles[0].match("ROLE_CLIENT")){

        this.router.navigateByUrl('/client')
        
        }else if (response.roles[0].match("ROLE_ADMIN")){

        this.router.navigateByUrl('/admin')
        }
      

        

    }, (error : HttpErrorResponse) => {
      
      this.loading = false;
        console.log(error);
        this.openSnackBar(error.error.message);
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
