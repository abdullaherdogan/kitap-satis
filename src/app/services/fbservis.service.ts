import { Sepet } from './../models/sepet';
import { Resim } from './../models/image';
import { Kategori } from './../models/kategori';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Kitap } from '../models/kitap';
import { Uye } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FbservisService {

private dbKitap = '/Kitaplar'
private dbKategori = '/Kategoriler'
private dbUye = '/Uyeler'
private dbImage = '/Images'
private dbSepet = '/Sepetler'

kitapRef: AngularFireList<Kitap>
kategoriRef: AngularFireList<Kategori>
uyeRef: AngularFireList<Uye>
imageRef:AngularFireList<Resim>
sepetRef:AngularFireList<Sepet>
constructor(
  public db: AngularFireDatabase,
  public afAuth: AngularFireAuth
) {
  this.kitapRef = db.list(this.dbKitap)
  this.kategoriRef = db.list(this.dbKategori)
  this.uyeRef = db.list(this.dbUye)
  this.imageRef = db.list(this.dbImage)
  this.sepetRef = db.list(this.dbSepet)
 }
//üye işlemleri başlangıç
OturumAc(mail:string,password:string){
  return this.afAuth.signInWithEmailAndPassword(mail,password);
}
OturumKapa(){
  return this.afAuth.signOut();
}
UyeKayit(mail:string,password:string){
  return this.afAuth.createUserWithEmailAndPassword(mail,password)
}
UyeEkle(uye:Uye){
  return this.uyeRef.push(uye)
}

//üye işlemleri bitiş
//kategori işlemleri başlangıç
KategoriEkle(kat:Kategori){
  return this.kategoriRef.push(kat)
}
KategoriDuzenle(kat:Kategori){
  return this.kategoriRef.update(kat.key,kat)
}
KategoriSil(key:string){
  return this.kategoriRef.remove(key)
}
KatByKey(key:string){
  return this.db.object('/Kategoriler/'+key)
}
KategoriListele(){
  return this.kategoriRef
}
//kategori işlemleri bitiş
//kitap işlemleri başlangıç
KitapListele(){
  return this.kitapRef
}
KitapByKey(key:string){
  return this.db.object('/Kitaplar/'+key)
}
KitapByKatKey(katKey: string){
  return this.db.list('/Kitaplar',q=>q.orderByChild("kategoriKey").equalTo(katKey))
}
KitapEkle(k:Kitap){
  return this.kitapRef.push(k)
}
KitapDuzenle(k:Kitap){
  return this.kitapRef.update(k.key,k)
}
KitapSil(key:string){
  return this.kitapRef.remove(key)
}
//kitap işlemleri bitiş

//sepet
SepeteEkle(sepet:Sepet){
  return this.sepetRef.push(sepet)
}
SepetByUid(uid:string){
  return this.db.list('/Sepetler',q=>q.orderByChild("uid").equalTo(uid))
}
//resimbyKey
ResimListele(){
  return this.imageRef;
}
ResimByKey(key:string){
  return this.db.object('/Images/'+key)
}
//oturum kontrol
OturumKontrol(){
  if (localStorage.getItem("user")) {
    return true
  } else {
    return false
  }
}
}
