import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(
    private authService:AuthService,
    private router:Router,
    private alerts: AlertsService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.alerts.setMessage('You are now logged in','success');
        this.router.navigate(['dashboard']);

      }else{
        this.alerts.setMessage(data.msg,'warn');
        this.router.navigate(['login']);
      }
    });
  }

}
