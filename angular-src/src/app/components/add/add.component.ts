import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import { AlertsService } from 'angular-alert-module';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  today=Date.now();
  username: String;
  // lname: String;
  lab: String;
  date: String;
  tslot: String;
  subject: String;

  constructor(
    private validateService:ValidateService,
    private alerts: AlertsService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onAddSubmit(){
    const user = this.authService.loadUser();
    //creating an object with data
    const lab = {
      username: user.username,
      // lname: this.lname,
      lab: this.lab,
      date: this.date,
      tslot: this.tslot,
      subject: this.subject
    }

    //Required Fields
    if(!this.validateService.validateLab(lab)){
      
      this.alerts.setConfig('warn','icon','warning');
      this.alerts.setMessage('All the fields are required','error');
      
      return false;
    }


    //Reserve Lab
    this.authService.addLab(lab).subscribe(data => {
      if(data.success){
        this.alerts.setMessage('Lab Reserved','success');
        this.router.navigate(['/view']);
      }else{
        this.alerts.setMessage('A reservation already done for that lab , date and time slot','error');
        //this.router.navigate(['/add']);
      }
    });

  }
}


