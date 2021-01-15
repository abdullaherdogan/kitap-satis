import { Router } from '@angular/router';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';

declare let alertify:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public fbservis: FbservisService,public router:Router) { }

  ngOnInit(): void {
  }
  OturumAc(mail:string,password:string){
    this.fbservis.OturumAc(mail,password).then(d=>{
      localStorage.setItem("user",JSON.stringify(d.user))
      if (d.user.email == "admin@admin.com") {
        this.router.navigate(['/admin'])
      } else {
        this.router.navigate([''])
      }
    },err=>{
      alertify.error('E-posta ya da şifre hatalı')
    })
  }
}
