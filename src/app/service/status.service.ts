import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatusApi } from '../api/status-api';
import { Message } from '../model/message';
import { Status } from '../model/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http : HttpClient) { }

  addStatus(data : any){
    return this.http.post<Message>(StatusApi.addStat,data)
  }

  editStatus(data : any){
  return this.http.put<Message>(StatusApi.editStat,data)
}

 getStatus(){
    return this.http.get<Status[]>(StatusApi.getStat)
  }

  deleteStatus(id : any){
     const options = { params: new HttpParams().set('statusId', id) };

    return this.http.delete<Message>(StatusApi.deleteStat,options)
  }

}
