import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationApi } from '../api/application-api';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http : HttpClient) { }

  addApplication(data : any) {
    return this.http.post(ApplicationApi.add,data)
  }

}
