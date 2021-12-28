import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StatusService } from 'src/app/service/status.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-status',
  templateUrl: './add-status.component.html',
  styleUrls: ['./add-status.component.scss']
})
export class AddStatusComponent implements OnInit {
  
  durationInSeconds = 5;
  danger : boolean = true;
  loading : boolean = false;

  constructor(private service : StatusService , private _snackBar: MatSnackBar, private router : Router) { }

  ngOnInit(): void {
  }

addStatus(data : any){

    console.log(data);

    this.loading = true;

    this.service.addStatus(data).subscribe(response => {

        this.loading = false;
        this.danger = false;
        console.log(response);

        this.openSnackBar(response.message);

        

    }, (error : HttpErrorResponse) => {
      
      this.loading = false;
      this.danger = true
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
