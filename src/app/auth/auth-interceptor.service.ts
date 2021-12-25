import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        //Take 1 value from the observable and automatically unsubscribe. After this use exhaustMap to replace it with new observable
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                //Only modifiy the token if we have atleast one user
                if(!user){
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });
                return next.handle(modifiedReq)
            })
        );
    }
}