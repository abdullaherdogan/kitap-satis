import { FbservisService } from 'src/app/services/fbservis.service';
import { Sepet } from './../../models/sepet';
import { Component, OnInit } from '@angular/core';

declare let alertify:any

@Component({
  selector: 'app-sepet',
  templateUrl: './sepet.component.html',
  styleUrls: ['./sepet.component.css']
})
export class SepetComponent implements OnInit {
  uid:string
  sepettekiler:Sepet[]= []
  constructor(public fbservis:FbservisService) { }

  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.SepetGetirByUid()
  }
  SepetGetirByUid(){
    this.fbservis.SepetByUid(this.uid).snapshotChanges().subscribe(data=>{
      this.sepettekiler = []
      data.forEach(satir=>{
        var s = {...satir.payload.toJSON(),key:satir.key}
        this.sepettekiler.push(s as Sepet)
      })
    })
  }
  SepettenCikar(key:string){
    this.fbservis.SepettenCikar(key).then(d=>{
      alertify.success('Ürün Sepetten Çıkarıldı')
    })
  }
}
