import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router'; 
//import {Lab} from '../../lab';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
 // private lab: Lab[];
  lab = [];

  constructor(
    private authService:AuthService, 
    private router:Router,
  
  ) { }

  ngOnInit() {
    this.viewLab();
  }

  viewLab(){
    this.authService.viewLab().subscribe(
      data => {
        this.lab = data.labs;
        // console.log(data);
        
      },
      err => {
        console.log(err);
        return false;
      });
  }

}
