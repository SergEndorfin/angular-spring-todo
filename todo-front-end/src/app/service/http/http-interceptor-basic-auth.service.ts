import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "../authentication.service";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  constructor(private basicAuthService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authenticatedToken = this.basicAuthService.getAuthenticatedToken();
    const userName = this.basicAuthService.getAuthenticatedUser();
    if (authenticatedToken && userName) {
      req = req.clone({
        setHeaders: {Authorization: authenticatedToken}
      });
    }
    return next.handle(req);
  }
}
