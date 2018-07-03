import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import { AlertsService } from 'angular-alert-module';
import {Router} from '@angular/router';
// import {FlashMessage} from 'angular-flash-message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService:ValidateService,
    private alerts: AlertsService,
    private authService: AuthService,
    private router: Router
  ) { }
//, private flashMessage:FlashMessage
  ngOnInit() {
  }

  onRegisterSubmit(){

    //creating an object with data
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    //Required Fields
    if(!this.validateService.validateRegister(user)){
      //this.flashMessage.info('Info message');
      //this.flashMessage.show('Please Fill in all fields', {cssClass: 'alert-danger', timeout:3000});
      
      this.alerts.setConfig('warn','icon','warning');
      this.alerts.setMessage('All the fields are required','error');
      // console.log("Fill all");
      return false;
    }

    //Validate Email
    if(!this.validateService.validateEmail(user.email)){
     // this.flashMessage.info('Info message');
     //this.flashMessage.show('Please use validate email', {cssClass: 'alert-danger', timeout:3000});
     this.alerts.setConfig('warn','icon','warning');
     this.alerts.setMessage('Give a validate email','error');
      //console.log("Give a validate email");
      return false;
    }

    //Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.alerts.setMessage('You are now Registered and can login','success');
        this.router.navigate(['/login']);
      }else{
        this.alerts.setMessage('Something went wrong','error');
        this.router.navigate(['/register']);
      }
    });

  }

  
}
