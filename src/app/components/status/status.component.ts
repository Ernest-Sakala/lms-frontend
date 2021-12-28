import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Message } from 'src/app/model/message';
import { Status } from 'src/app/model/status';
import { StatusService } from 'src/app/service/status.service';
import { SubscriptionService } from 'src/app/service/subscription.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  isVisible = false;
  
  durationInSeconds = 5;
  danger : boolean = true;
  loading : boolean = false;
  submitted: boolean = false;
  editStatus! : Status;

  statuses! : Status[]

  constructor(private statusService : StatusService, private modal: NzModalService, private _snackBar: MatSnackBar) {
    
   }

  ngOnInit(): void {
    this.getStatus()
  }
  getStatus(){
    this.statusService.getStatus().subscribe(response => {
      this.statuses = response
      console.log(response)
    })
 }

handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  showModal(status : Status): void {
    this.editStatus = status
    this.isVisible = true;
  }


  editStatusSubmit(data : any) : void {

    data.id = this.editStatus.id

    console.log(data)

    this.statusService.editStatus(data).subscribe(response => {


      this.danger = false

      this.openSnackBar(response.message)

      this.getStatus()
  
      
    }, (error : HttpErrorResponse) => {

      this.openSnackBar(error.message)
    })
  }


   showDeleteConfirm(status : Status): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this task?',
      nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteStatus(status),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }



   deleteStatus(status : Status){
    this.statusService.deleteStatus(status.id).subscribe((response : Message)=> {
      console.log(response)
      this.danger = false
          
      this.statuses = this.statuses.filter(statusInput => statusInput.id !== status.id)
     // this.usersSecond = this.usersSecond.filter(currentUser => currentUser.id !== user.id)

      this.openSnackBar(response.message)
    },(error : HttpErrorResponse)=>{
      this.danger = true
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
