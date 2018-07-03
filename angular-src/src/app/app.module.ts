import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; //, ErrorHandler
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import { AlertsModule } from 'angular-alert-module';
import {AuthGuard} from './guards/auth.guard';
import { ViewComponent } from './components/view/view.component';
import { AddComponent } from './components/add/add.component';
import { UpdateComponent } from './components/update/update.component';
import { SearchComponent } from './components/search/search.component';
import { AdminComponent } from './components/admin/admin.component';
//import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent}, 
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'view', component: ViewComponent},
  {path:'add', component: AddComponent},
  {path:'search', component: SearchComponent},
  {path:'admin', component: AdminComponent},
  {path:'editReservation/:id',component:UpdateComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    ViewComponent,
    AddComponent,
    UpdateComponent,
    SearchComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AlertsModule.forRoot()
   
  ],
  providers: [ValidateService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
