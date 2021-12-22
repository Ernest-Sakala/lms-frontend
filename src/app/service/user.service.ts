import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {UserApi} from '../api/user'
import { LoginModel } from '../model/login-model';
import { Message } from '../model/message';
import { UserModel } from '../model/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public registerSuccess : boolean = false



  constructor(private http : HttpClient) { }

  login(data : any) {
    return this.http.post<LoginModel>(UserApi.login, data);
  }

  register(data : any){
    return this.http.post<UserModel> (UserApi.register, data);
  }

  getUsers(){
    return this.http.get<UserModel []> (UserApi.users)
  }

  deleteUser(id : any){
    const options = { params: new HttpParams().set('userId', id) };

    return this.http.delete<Message> (UserApi.delete,options)
  }
  registered(){
    return this.registerSuccess
  }

  
  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem("token")
  }

  
}
