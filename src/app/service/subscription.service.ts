import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubscritionApi } from '../api/subscrition-api';
import { UserApi } from '../api/user';
import { Message } from '../model/message';
import { Subscription } from '../model/subscription';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private http: HttpClient) {}

  addSubscription(data: any) {
    return this.http.post<Message>(SubscritionApi.addSub, data);
  }
  getSubscriptions() {
    return this.http.get<Subscription[]>(SubscritionApi.getSub);
  }

  deleteSubscription(id: any) {
    const options = { params: new HttpParams().set('subscriptionId', id) };

    return this.http.delete<Message>(SubscritionApi.delete, options);
  }
  editSubsciption(data : any){
    return this.http.put<Message>(SubscritionApi.editSub, data);
  }
}
