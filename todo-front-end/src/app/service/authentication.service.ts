import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {API_URL} from "../app.constants";

const AUTH_TOKEN = 'authenticatedToken';
const AUTH_USER = 'authenticatedUser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private client: HttpClient) {
  }

  executeJwtAuthService(username: string, password: string): Observable<any> {
    return this.client
      .post<any>(`${API_URL}/authenticate`, {username, password})
      .pipe(
        tap(response => {
          sessionStorage.setItem(AUTH_USER, username);
          sessionStorage.setItem(AUTH_TOKEN, `Bearer ${response.token}`);
        })
      );
  }

  executeBasicAuthService(userName: string, password: string): Observable<any> {
    const basicAuthHeader = 'Basic ' + window.btoa(userName + ':' + password);

    const headers = new HttpHeaders({Authorization: basicAuthHeader});
    return this.client
      .get<AuthBean>(`${API_URL}/basic-auth`, {headers})
      .pipe(
        tap(() => {
          sessionStorage.setItem(AUTH_USER, userName);
          sessionStorage.setItem(AUTH_TOKEN, basicAuthHeader);
        })
      );
  }

  getAuthenticatedUser() {
    console.log('getAuthenticatedUser()')
    return sessionStorage.getItem(AUTH_USER);
  }

  getAuthenticatedToken() {
    if (!!this.getAuthenticatedUser()) {
      return sessionStorage.getItem(AUTH_TOKEN);
    }
    return undefined;
  }

  isUserLoggedIn() {
    return !!sessionStorage.getItem(AUTH_USER);
  }

  logout() {
    sessionStorage.removeItem(AUTH_USER)
    sessionStorage.removeItem(AUTH_TOKEN)
  }
}

export class AuthBean {
  constructor(public message: string) {
  }
}
