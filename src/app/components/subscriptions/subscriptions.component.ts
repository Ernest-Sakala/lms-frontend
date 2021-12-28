import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Message } from 'src/app/model/message';
import { Subscription } from 'src/app/model/subscription';
import { SubscriptionService } from 'src/app/service/subscription.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
})
export class SubscriptionsComponent implements OnInit {
  isVisible = false;
  isVisibleDelete = false;
  subscriptionModel!: Subscription;

  subscriptions!: Subscription[];
  danger: boolean = false;

  constructor(
    private subscriptionService: SubscriptionService,
    private modal: NzModalService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getSubscriptions();
  }
  getSubscriptions() {
    this.subscriptionService.getSubscriptions().subscribe((response) => {
      this.subscriptions = response;
      console.log(response);
    });
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  showModal(data: any): void {
    this.isVisible = true;
    this.subscriptionModel = data;
  }

  showDeleteConfirm(subscription: Subscription): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this task?',
      nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteStatus(subscription),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  deleteStatus(subscription: Subscription) {
    this.subscriptionService.deleteSubscription(subscription.id).subscribe(
      (response: Message) => {
        console.log(response);
        this.danger = false;

        this.subscriptions = this.subscriptions.filter(
          (subscriptionInput) => subscriptionInput.id !== subscription.id
        );
        // this.usersSecond = this.usersSecond.filter(currentUser => currentUser.id !== user.id)

        this.openSnackBar(response.message);
      },
      (error: HttpErrorResponse) => {
        this.danger = true;
        this.openSnackBar(error.message);
      }
    );
  }

  openSnackBar(message: string) {
    const configureSnackBar = new MatSnackBarConfig();
    configureSnackBar.duration = 5000;
    configureSnackBar.horizontalPosition = 'center';
    configureSnackBar.verticalPosition = 'bottom';
    configureSnackBar.panelClass = this.danger
      ? 'snackbar-danger'
      : 'snackbar-success';

    this._snackBar.open(message, undefined, configureSnackBar);
  }

  editSubscription(data: any) {
    this.subscriptionModel.interest = data.interest;
    this.subscriptionModel.period = data.period;
    console.log(data);
    this.subscriptionService
      .editSubsciption(this.subscriptionModel)
      .subscribe((response) => {
        this.getSubscriptions();
        this.isVisible = false
        console.log(response);
      });
  }
}
