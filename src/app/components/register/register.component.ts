import { Uye } from './../../models/user';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare let alertify:any

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  secUye:Uye= new Uye()
  constructor(public fbservis:FbservisService,public router: Router) { }

  ngOnInit(): void {
  }
  UyeKayit(mail:string,password:string){
    this.fbservis.UyeKayit(mail,password).then(d=>{
      localStorage.setItem("user",JSON.stringify(d.user))
      this.secUye.mail = d.user.email
      this.secUye.uid = d.user.uid
      d.user.updateProfile({
        displayName: this.secUye.adsoyad
      })
      if (d.user.email == "admin@admin.com") {
        this.router.navigate(['/admin'])
      } else {
        this.router.navigate([''])
      }
      this.UyeEkle()
      alertify.success('Kaydınız gerçekleşti')
    },err=>{
      alertify.error('Bir Hata Oluştu')
    })
  }
  UyeEkle(){
    this.fbservis.UyeEkle(this.secUye)
  }
}
