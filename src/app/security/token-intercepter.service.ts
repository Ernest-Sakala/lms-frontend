import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService implements HttpInterceptor {

  constructor(private injector : Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    var userService = this.injector.get(UserService);

    var tokenRequest = req.clone({
      setHeaders : {
        Authorization : `${userService.getToken()}`
      }
    });

   return next.handle(tokenRequest);
  }

  
}
