import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import { AlertsService } from 'angular-alert-module';
import {Router} from '@angular/router';

declare var jsPDF: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  username: String;
  lab: String;
  subject:String;
  date: String;
  tslot: String;
  labs = [];

  constructor(
    private validateService:ValidateService,
    private alerts: AlertsService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  searchByDate(){
    const date= this.date;
    this.authService.searchLab(date).subscribe(data =>{
      this.labs = data.labs;
    },
    error =>{
      console.log(error);
      return false;
    }
  );

  }

  download(){
    const date= this.date;
    console.log(date);
    const columns = ["Lab Name","Subject","Time Slot","Reserved By"];
    const rows = [];
    const data = this.labs;
    for (let lab of data){
      const array = [];
      array.push(lab.lab, lab.subject, lab.tslot, lab.username);
      rows.push(array);
    }

    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns,rows);
   // console.log(this.lab);
    doc.save(date+'_'+'Lab_Reservations.pdf');
  }

}
