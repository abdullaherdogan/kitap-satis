import { Sepet } from './../../models/sepet';
import { Kategori } from './../../models/kategori';
import { Kitap } from './../../models/kitap';
import { FbservisService } from 'src/app/services/fbservis.service';
import { Component, OnInit } from '@angular/core';

declare let alertify:any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  secKitap:Kitap = new Kitap()
  kitaplar:Kitap[];
  kategoriler:Kategori[];
  sepet:Sepet = new Sepet();
  kitKeyForSepet:string;

  constructor(public fbservis:FbservisService) { }

  ngOnInit(): void {
    this.KitaplariGetir()
    this.KategoriGetir()
  }
  //kitap işlemleri
  KitaplariGetir() {
    this.fbservis.KitapListele().snapshotChanges().subscribe(data => {
      this.kitaplar = [];
      data.forEach(satir => {
        var kits = { ...satir.payload.toJSON()};
        this.kitaplar.push(kits as Kitap);
      });
    });
  }
  KitapByKategoriKey(key:string){
    this.fbservis.KitapByKatKey(key).snapshotChanges().subscribe(data=>{
      this.kitaplar = [];
      data.forEach(satir=>{
        var k = {...satir.payload.toJSON(),key:satir.key}
        this.kitaplar.push(k as Kitap)
      })
    })
  }


  //kategori işlemleri
  KategoriGetir() {
    this.fbservis.KategoriListele().snapshotChanges().subscribe(data => {
      this.kategoriler = [];
      data.forEach(satir => {
        var kats = { ...satir.payload.toJSON(), key: satir.key };
        this.kategoriler.push(kats as Kategori);
      });
    });
  }

  //sepet
  SepetBtn(key:string){
    var user = JSON.parse(localStorage.getItem("user"));
    this.sepet.uid  = user.uid
    this.sepet.kitapKey = key
    console.log(this.sepet.uid)
    console.log(this.sepet.kitapKey)
    
  }
  SepeteEkle(sepet:Sepet){
    this.fbservis.SepeteEkle(sepet).then(d=>{
      alertify.success('Ürün sepete eklendi')
    })
  }
}
