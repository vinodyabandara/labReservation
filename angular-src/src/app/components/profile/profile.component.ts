import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { AlertsService } from 'angular-alert-module';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:Object;
  lab = [];

  constructor(
    private authService:AuthService, 
    private router:Router,
    private alerts: AlertsService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });

    const username = this.authService.loadUser().username;  
    this.authService.getUserReserve(username).subscribe(data=> {
      this.lab = data.labs;
      //console.log(username);
      //console.log(data.labs);
    },
    err => {
      console.log(err);
      return false;
    });

    
    }

    delete(id){
      this.authService.delete(id).subscribe(res => {
        
        if(res.success){
         
         this.alerts.setMessage('Reservation Deleted','success');
         this.ngOnInit();
        }

        // else{
        //   this.alerts.setMessage(res.msg,'warn');
        //   this.router.navigate(['profile']);
        // }
      });
  }

    edit(id){
      this.router.navigate(['/editReservation/'+id]);
    }
}
