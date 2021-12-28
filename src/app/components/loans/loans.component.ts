import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LoanModel } from 'src/app/model/loan-model';
import { Message } from 'src/app/model/message';
import { QuestionsModel } from 'src/app/model/questions-model';
import { Status } from 'src/app/model/status';
import { UserModel } from 'src/app/model/user-model';
import { LoanService } from 'src/app/service/loan.service';
import { QuestionsService } from 'src/app/service/questions.service';
import { StatusService } from 'src/app/service/status.service';
import { UserService } from 'src/app/service/user.service';



@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss'],
})
export class LoansComponent implements OnInit {
  durationInSeconds = 5;
  userPaid: boolean = false;
  isVisible = false;
  danger: boolean = true;
  loading: boolean = false;
  submitted: boolean = false;
  index: number = 0;
  loans!: LoanModel[];
  page = 1;
  pageSize = 4;
  collectionSize = 0;
  isAdmin: boolean = false;
  editLoan!: LoanModel;
  selectedValue!: Status;
  answersModel!: QuestionsModel;
  userModel! : UserModel
  checked = false;
  disabled = false;
  isReviewVisible: boolean = false;
  isVisibleUser: boolean = false;

  statuses!: Status[];
  loansecond!: LoanModel[];

  constructor(
    private questionService: QuestionsService,
    private statusService: StatusService,
    private userService: UserService,
    private modal: NzModalService,
    private _snackBar: MatSnackBar,
    private loanService: LoanService
  ) {}

  checkRole() {
    let role = localStorage.getItem('role');

    if (role?.match('ROLE_CLIENT')) {
      this.isAdmin = false;
    } else if (role?.match('ROLE_ADMIN')) {
      this.isAdmin = true;
    }
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  canGetLoan(data: any) {
    data.canAcquireLoan = true;
    this.questionService.editAnswer(data).subscribe((response) => {
      console.log(response);
    });

    this.isReviewVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  showModal(loan: LoanModel): void {
    this.userPaid = loan.isPaid;
    this.editLoan = loan;
    this.isVisible = true;
  }

  showReviewModal(answer: any): void {
    this.isReviewVisible = true;
    this.answersModel = answer;
  }

  showUserModal(data : any): void {
    this.isVisibleUser = true;
    this.userModel = data

  }

  handleCancelUser(){
    this.isVisibleUser = false
  }

  hideReviewModal() {
    this.isReviewVisible = false;
  }

  editLoanSubmit(data: any): void {
    data.id = this.editLoan.id;

    this.editLoan.loanStatus = this.selectedValue.statusName

    console.log(this.selectedValue)

    this.loanService.editLoan(this.editLoan).subscribe(
      (response) => {
        this.danger = false;

        this.openSnackBar("Loan Upated");
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar(error.message);
      }
    );
  }

  ngOnInit(): void {
    this.getLoans();

    this.checkRole();

    this.getStatuses();
  }

  // getAnswers(id : any){
  //   this.questionService.getAnswer(id).subscribe(response => {
  //     console.log(response)
  //     this.answersModel = response
  //   })
  // }

  refreshLoans() {
    this.loans = this.loansecond
      .map((country, i) => ({ counter: i + 1, ...country }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  getStatuses() {
    this.statusService.getStatus().subscribe((response) => {
      console.log(response);
      this.statuses = response;
    });
  }

  getLoans() {
    this.loanService.getLoans().subscribe((response) => {
      console.log(response);
      this.loans = response;
      this.loansecond = response;

      this.collectionSize = this.loans.length;

      this.loans = response
        .map((country, i) => ({ counter: i + 1, ...country }))
        .slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
    });
  }

  showDeleteConfirm(loan: LoanModel): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this task?',
      nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteLoan(loan),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  deleteLoan(loan: LoanModel) {
    this.loanService.deleteLoan(loan.id).subscribe(
      (response: Message) => {
        console.log(response);
        this.danger = false;

        this.loans = this.loans.filter(
          (currentLoan) => currentLoan.id !== loan.id
        );
        this.loansecond = this.loansecond.filter(
          (currentUser) => currentUser.id !== loan.id
        );

        console.log(this.index);
        this.refreshLoans();
        this.openSnackBar(response.message);
      },
      (error: HttpErrorResponse) => {
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
}
