import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubscritionApi } from '../api/subscrition-api';
import { Message } from '../model/message';
import { Subscription } from '../model/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http : HttpClient) { 

  }

addSubscription(data : any){
return this.http.post<Message>(SubscritionApi.addSub,data)
}
getSubscriptions(){
  return this.http.get<Subscription[]>(SubscritionApi.getSub)
}

}
