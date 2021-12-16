import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {UserApi} from '../api/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  login(data : any) {
    return this.http.post(UserApi.login, data);
  }

  register(data : any){
    return this.http.post(UserApi.register, data);
  }
}
