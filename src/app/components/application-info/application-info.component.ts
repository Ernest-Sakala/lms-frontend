import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from 'src/app/service/application.service';

@Component({
  selector: 'app-application-info',
  templateUrl: './application-info.component.html',
  styleUrls: ['./application-info.component.scss']
})
export class ApplicationInfoComponent implements OnInit {

   durationInSeconds = 5;
  danger : boolean = true;
  loading : boolean = false;
  submitted: boolean = false;


  favoriteSeason!: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];


  expenses = [
    {name : 'Rent', value : 'Rent' , checked : false},
    {name : 'TV', value : 'TV' , checked : false},
    {name : 'Entertainment', value : 'Entertainment' , checked : false}
  ]

  assets = [
    {name : 'Land', value : 'Land' , checked : false},
    {name : 'House', value : 'House' , checked : false},
    {name : 'Motor vehicle', value : 'Motor Vehicle' , checked : false},
    {name : 'Business', value : 'Business' , checked : false},
    {name : 'Other', value : 'Other' , checked : false}
  ]


  

  id! : number
  constructor(private router : ActivatedRoute, private applicationService : ApplicationService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = params.id
    })
  }


  submitInfo(data : any){
  
    this.loading = true

    data.monthlyExpenses = this.expenses.filter(expense => expense.checked).map(expense => expense.name)

   data.assetsOwned = this.assets.filter(asset => asset.checked).map(asset => asset.name)
   data.user = {
     "id" : this.id
   }

   this.applicationService.addApplication(data).subscribe(response => {

     this.loading = false
     this.danger = false
     this.openSnackBar("Your details have been submitted succesfully")
     console.log(response)
   },(error : HttpErrorResponse)=>{
     this.loading = false
     this.openSnackBar(error.message)
   })

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
