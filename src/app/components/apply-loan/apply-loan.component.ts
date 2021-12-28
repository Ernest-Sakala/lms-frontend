import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanApi } from 'src/app/api/loan-api';
import { LoanModel } from 'src/app/model/loan-model';
import { QuestionsModel } from 'src/app/model/questions-model';
import { Subscription } from 'src/app/model/subscription';
import { LoanService } from 'src/app/service/loan.service';
import { SubscriptionService } from 'src/app/service/subscription.service';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrls: ['./apply-loan.component.scss'],
})
export class ApplyLoanComponent implements OnInit {
  payments: number = 0;
  loanAmount: number = 0;
  interest: number = 0;
  selectedValue!: Subscription;
  amount: number = 0;
  subscriptions!: Subscription[];
  durationInSeconds = 5;
  danger: boolean = true;
  loading: boolean = false;
  submitted: boolean = false;
  answerId!: string;

  constructor(
    private routerAcive: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router,
    private loanService: LoanService,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.getSubscription();

    this.routerAcive.params.subscribe((params) => {
      this.answerId = params.id;
    });
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

  getSubscription() {
    this.subscriptionService.getSubscriptions().subscribe((response) => {
      console.log(response);
      this.subscriptions = response;
    });
  }

  applyLoan() {
    const loan = new LoanModel();
    loan.interest = this.interest;
    loan.payments = this.payments;
    loan.totalAmount = this.loanAmount;
    loan.loanAmount = this.amount
    loan.subscriptionModel = this.selectedValue;

    const que = new QuestionsModel();

    que.id = parseInt(this.answerId);

    loan.question = que;

    this.loanService.requestLoan(loan).subscribe(
      (response) => {
        console.log(response);

        this.loading = false;

        this.danger = false;

        this.openSnackBar(response.message);
      },
      (error: HttpErrorResponse) => {
        this.loading = false;

        this.openSnackBar(error.message);
      }
    );
  }

  calculateLoan() {
    console.log(this.amount);
    console.log(this.selectedValue);

    this.interest =
      (this.amount * Number.parseInt(this.selectedValue.interest)) / 100;
    this.loanAmount =
      Number.parseInt(this.amount.toString()) +
      Number.parseInt(this.interest.toString());
    this.payments =
      this.loanAmount / Number.parseInt(this.selectedValue.period);
  }
}
