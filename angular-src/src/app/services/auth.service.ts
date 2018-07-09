import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import { ContentType } from '@angular/http/src/enums';

@Injectable()
export class AuthService {
  authToken:any;
  user:any;
  //lab:any;

  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user,{headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user,{headers: headers})
      .map(res => res.json());
  }

  //for admin panel
  getUser(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/viewUser/', {headers: headers})
    .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile',{headers: headers})
      .map(res => res.json());
  }

  storeUserData(token,user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;

  }

  //load token to get profile data
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  //for admin panel
  loadUserType(){
    if(tokenNotExpired('id_token')){
      const user = localStorage.getItem('user');
      this.user = JSON.parse(user);
      if(this.user.usertype == "admin"){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  addLab(lab){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/labs/add', lab,{headers: headers})
      .map(res => res.json());
  }

  //for view
  viewLab(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/labs/view',{headers: headers})
      .map(res => res.json());
  }

  loadUser(){
    return JSON.parse(localStorage.getItem('user'));
  }

  //for the profile
  getUserReserve(username){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/labs/addReserve/'+username, {headers: headers})
    .map(res => res.json());
  }

  delete(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/labs/delete/'+id, {headers: headers})
    .map(res => res.json());
  }

  //edit reservation
  update(id,reservation){
   //console.log(id);
   //console.log(reservation);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/labs/update/'+id, reservation, {headers: headers})
    .map(res => res.json());

  }

  //for one reservation
  getReservation(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/labs/getReservation/'+id, {headers: headers})
    .map(res => res.json());
  }

  searchLab(date){
    console.log("auth service"+date);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/labs/search/'+date, {headers: headers})
    .map(res => res.json());
  }

 
}
