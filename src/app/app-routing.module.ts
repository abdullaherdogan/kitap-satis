import { AdminComponent } from './components/admin/admin.component';
import { SepetComponent } from './components/sepet/sepet.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AngularFireAuthGuard,redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectLogin =()=>redirectUnauthorizedTo(['login'])

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {path:'sepet',component: SepetComponent,
   canActivate:[AngularFireAuthGuard],
    data:{
      authGuardPipe: redirectLogin
    }},
    {path:'admin',component: AdminComponent,
    canActivate:[AngularFireAuthGuard],
     data:{
       authGuardPipe: redirectLogin
     }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
