import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user = [];
  constructor(
    private authService:AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getUser().subscribe(
      data=>{
        this.user = data.users;
        console.log(this.user);
      },
      error =>{
        console.log(error);
        return false;
      }
    )
  }

}
