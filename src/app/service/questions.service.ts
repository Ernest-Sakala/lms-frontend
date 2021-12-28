import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionsApi } from '../api/questions-api';
import { Message } from '../model/message';
import { QuestionsModel } from '../model/questions-model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http : HttpClient) { }

  addAnswer(data : any){
    return this.http.post<QuestionsModel>(QuestionsApi.addAns,data)
  }

  editAnswer(data : any){
    return this.http.put<Message>(QuestionsApi.editAns,data)
  }

  getAnswer(id : any) {
    const options = { params: new HttpParams().set('loanId', id) };
    return this.http.get<QuestionsModel>(QuestionsApi.getAns, options)
  }

  deleteAnswer(id : any) {
    const options = { params: new HttpParams().set('questionsId', id) };
    return this.http.delete<Message>(QuestionsApi.deleteAns,options)
  }
}

