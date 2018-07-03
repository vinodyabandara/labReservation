import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router,
    private alerts: AlertsService
  ) { }

  ngOnInit() {
  }

  onLogoutClick(){
    
    this.authService.logout();
    this.alerts.setMessage('You are now logged out','success');
    this.router.navigate(['/login']);
    return false;

  }
    
}
