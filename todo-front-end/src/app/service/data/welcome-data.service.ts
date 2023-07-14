import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private client: HttpClient) {
  }

  executeHelloThereBeanService(name: string) {
    return this.client.get<HelloWorldBean>(`http://localhost:8080/hello-there/${name}`);
  }
}

export class HelloWorldBean {
  constructor(public message: string) {
  }
}
