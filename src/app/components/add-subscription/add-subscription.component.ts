import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.scss']
})
export class AddSubscriptionComponent implements OnInit {

  durationInSeconds = 5;
  danger : boolean = true;
  loading : boolean = false;

  constructor(private service : SubscriptionService , private _snackBar: MatSnackBar, private router : Router ) { }

  ngOnInit(): void {
  }

  addSubscription(data : any){

    console.log(data);

    this.loading = true;

    this.service.addSubscription(data).subscribe(response => {

        this.loading = false;
        this.danger = false;
        console.log(response);

        this.openSnackBar(response.message);

        

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




