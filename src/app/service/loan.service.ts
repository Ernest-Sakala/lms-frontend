import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoanApi } from '../api/loan-api';
import { LoanModel } from '../model/loan-model';
import { Message } from '../model/message';

@Injectable({
  providedIn: 'root'
})

export class LoanService {

  constructor(private http : HttpClient) { }

  requestLoan(data : any){
    return this.http.post<Message>(LoanApi.requestLn,data)
  }

  editLoan(data : any){
  return this.http.put<Message>(LoanApi.editLn,data)
}

  getLoans(){
    return this.http.get<LoanModel[]>(LoanApi.getLn)
  }

  deleteLoan(id : any){
const options = { params: new HttpParams().set('loanId', id) };

    return this.http.delete<Message>(LoanApi.deleteLn,options)
  }
}
