import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/user-model';
import { UserService } from 'src/app/service/user.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Message } from 'src/app/model/message';




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  durationInSeconds = 5;
  danger : boolean = true;
  loading : boolean = false;
  submitted: boolean = false;
  index : number = 0;
  users! : UserModel[];
  page = 1;
  pageSize = 4;
  collectionSize = 0
 
  usersSecond! :  UserModel[];
  


  constructor(private userService : UserService,private modal: NzModalService, private _snackBar: MatSnackBar) {
    
   }

  
  ngOnInit(): void {
    
    this.getUsers()
    
  }

  refreshUsers() {
    this.users = this.usersSecond
      .map((country, i) => ({counter: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

  }


  getUsers() {

   this.userService.getUsers().subscribe(response => {

     console.log(response) 
     this.users = response 
     this.usersSecond = response

     this.collectionSize = this.users.length

     this.users = response
      .map((country, i) => ({counter: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
   })
  }

  showDeleteConfirm(user : UserModel): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this task?',
      nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteUser(user),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  
  deleteUser(user : UserModel){
    this.userService.deleteUser(user.id).subscribe((response : Message)=> {
      console.log(response)
      this.danger = false
          
      this.users = this.users.filter(currentUser => currentUser.id !== user.id)
      this.usersSecond = this.usersSecond.filter(currentUser => currentUser.id !== user.id)

      console.log(this.index)
      this.refreshUsers()
      this.openSnackBar(response.message)
    },(error : HttpErrorResponse)=>{
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
