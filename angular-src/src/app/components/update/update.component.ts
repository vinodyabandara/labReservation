import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from '../../services/validate.service';
import { AlertsService } from 'angular-alert-module';
import {Router,ActivatedRoute,Params} from '@angular/router';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  today=Date.now();
  id: String;
  username: String;
  lab: String;
  subject: String;
  date: String;
  tslot: String;
  labs: any;

  constructor(
    private validateService:ValidateService,
    private alerts: AlertsService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.id = params['id'];
      console.log(this.id);
    });
    this.authService.getReservation(this.id).subscribe(oneReservation =>{
      this.labs = oneReservation.labs;
      this.lab = this.labs.lab;
      this.subject = this.labs.subject;
      this.date = this.labs.date;
      this.tslot = this.labs.tslot;
    },
    err=> {
      console.log(err);
      return false;
    });
    
  }

  onEditReservation(id){
    const user = this.authService.loadUser();
    const editedReservation = {
      username: user.username,
      lab: this.lab,
      subject:this.subject,
      date:this.date,
      tslot:this.tslot
    }
    //console.log(editedReservation);
    this.authService.update(this.id, editedReservation).subscribe(data =>{
      if(data.success){
        
        this.alerts.setMessage('Reservation updated','success');
        this.router.navigate(['/profile']);
      } else {
        this.alerts.setMessage('A reservation already done for that lab , date and time slot','error');
        this.router.navigate(['/editReservation/'+this.id]);
      }
    
    });
  }

}
