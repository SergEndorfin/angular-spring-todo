import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userName = 'test';
  password = '';
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;

  constructor(private router: Router,
              private authService: AuthenticationService) {
  }

  handleAuthLogin() {
    this.authService.executeJwtAuthService(this.userName, this.password)
      .subscribe({
        next: data => {
          console.log(data);
          this.router.navigate(['welcome', this.userName]);
          this.invalidLogin = false;
        },
        error: err => {
          console.log(err);
          this.invalidLogin = true;
        }
      });
  }
}
