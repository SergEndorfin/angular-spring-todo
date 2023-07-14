import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HelloWorldBean, WelcomeDataService} from "../service/data/welcome-data.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name = '';
  welcomeMessageFromService = '';

  constructor(private activatedRout: ActivatedRoute,
              private welcomeThereService: WelcomeDataService) {
  }

  ngOnInit(): void {
    this.name = this.activatedRout.snapshot.params['name'];
  }

  getWelcomeMessage() {
    this.welcomeThereService
      .executeHelloThereBeanService(this.name)
      .subscribe(
        {
          next: this.handleSuccessfulResponse.bind(this),
          error: this.handleErrorResponse.bind(this)
        }
      );
  }

  handleSuccessfulResponse(response: HelloWorldBean) {
    this.welcomeMessageFromService = response.message;
  }

  handleErrorResponse(error: any) {
    this.welcomeMessageFromService = error.message;
  }
}
