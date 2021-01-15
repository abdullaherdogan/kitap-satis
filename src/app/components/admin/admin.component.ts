import { Resim } from './../../models/image';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kategori } from 'src/app/models/kategori';
import { Kitap } from 'src/app/models/kitap';
import { FbservisService } from 'src/app/services/fbservis.service';
import { StservisService } from 'src/app/services/stservis.service';

declare let alertify:any

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  secKitap: Kitap = new Kitap();
  secKategori: Kategori = new Kategori();
  resim: Resim = new Resim();
  kitaplar: Kitap[];
  kategoriler: Kategori[];
  resimler: Resim[];
  kitapKey:string
  files: FileList;
  url: string;

  ekleContent: boolean = false;
  tumKitaplar: boolean = true;
  duzenleContent: boolean = false;
  tumKategoriler: boolean = false;
  constructor(public router: Router, public fbservis: FbservisService, public stservis: StservisService) { }

  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem("user"));
    var mail = user.email;
    if (mail !== "admin@admin.com") {
      this.router.navigate(['']);
    }
    this.KategoriGetir();
    this.KitaplariGetir();
    this.ResimListele();
  }
  //kitap işlemleri başlangıç
  KitapEkle() {
    this.fbservis.KitapEkle(this.secKitap).then(d => {
      alertify.success('Kitap Eklendi');
      this.ekleContent = false;
      this.tumKitaplar = true;
    });
  }
  KitaplariGetir() {
    this.fbservis.KitapListele().snapshotChanges().subscribe(data => {
      this.kitaplar = [];
      data.forEach(satir => {
        var kits = { ...satir.payload.toJSON(), key: satir.key };
        this.kitaplar.push(kits as Kitap);
      });
    });
  }
  KitapDuzenle(){
    this.fbservis.KategoriDuzenle(this.secKitap).then(d=>{
      this.duzenleContent = false
      alertify.success('Kitap Güncellendi')
    })
  }
  KitapSil(key:string){
    this.fbservis.KitapSil(key).then(d=>{
      alertify.success('Kitap Silindi')
    })
  }
  KitapDuzenleBtn(k:Kitap){
    this.secKitap = k
    this.tumKitaplar = false
    this.duzenleContent = true
  }
  KitapDuzenleIptal(){
    this.secKitap = new Kitap()
    this.duzenleContent = false
    this.tumKitaplar = true
  }
 
  //kitap işlemleri bitiş
  //kategori işlemleri
  KategoriEkle() {
    this.fbservis.KategoriEkle(this.secKategori).then(d => {
      alertify.success('Kategori Eklendi');
    });
  }
  KategoriGetir() {
    this.fbservis.KategoriListele().snapshotChanges().subscribe(data => {
      this.kategoriler = [];
      data.forEach(satir => {
        var kats = { ...satir.payload.toJSON(), key: satir.key };
        this.kategoriler.push(kats as Kategori);
      });
    });
  }
  KategoriDuzenle() {
    this.fbservis.KategoriDuzenle(this.secKategori).then(d => {
      alertify.success('Kategori Düzenlendi');
      this.duzenleContent = false;
    });
  }
  KatIptal(){
    this.secKategori = new Kategori()
    this.duzenleContent = false
    this.tumKategoriler = true
  }
  DuzenleBtn(k: Kategori) {
    this.secKategori = k;
    this.tumKategoriler = false;
    this.duzenleContent = true;
  }
  KategoriSil(key: string) {
    this.fbservis.KategoriSil(key).then(d => {
      alertify.success('Kategori Silindi');
    });
  }
  //resim işlemi
  ResimListele() {
    this.fbservis.ResimListele().snapshotChanges().subscribe(data => {
      this.resimler = [];
      data.forEach(satir => {
        var res = { ...satir.payload.toJSON(), key: satir.key };
        this.resimler.push(res as Resim);
      });
    });
  }
  DosyaSec(e) {
    return this.files = e.target.files;
  }
  ResimYukle() {
    var file = this.files[0];
    var resim = new Resim();
    resim.file = file;
    this.stservis.ResimYukle(resim).subscribe(d => {
      alertify.success('Resim Yüklendi');
    }, err => {
      alertify.error('Bir Hata Oluştu');
    });
  }

  //content alanı açı kapa
  TumKitaplarGoster() {
    this.tumKitaplar = true;
    this.ekleContent = false;
    this.duzenleContent = false;
    this.tumKategoriler = false;
  }
  TumKategorilerGoster() {
    this.tumKitaplar = false;
    this.ekleContent = false;
    this.duzenleContent = false;
    this.tumKategoriler = true;
  }
  EkleContent() {
    this.tumKitaplar = false;
    this.ekleContent = true;
    this.duzenleContent = false;
    this.tumKategoriler = false;
  }
  DuzenleContent() {
    this.tumKitaplar = false;
    this.ekleContent = false;
    this.duzenleContent = true;
    this.tumKategoriler = false;
  }
}
