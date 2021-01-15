import { HomeComponent } from './components/home/home.component';

import { AdminComponent } from './components/admin/admin.component';
import { StservisService } from './services/stservis.service';
import { FbservisService } from './services/fbservis.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { SepetComponent } from './components/sepet/sepet.component';
import {AngularFireStorageModule} from '@angular/fire/storage'



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    SepetComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [FbservisService,StservisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
