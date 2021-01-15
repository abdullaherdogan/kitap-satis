import { Resim } from './../models/image';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class StservisService {
  
private basePath = '/Images'
constructor(public db:AngularFireDatabase,public storage:AngularFireStorage) { }
ResimYukle(resim:Resim){
  const dosyaYol = this.basePath+ "/"+ resim.file.name
  const storageRef = this.storage.ref(dosyaYol)
  const yukleTask = this.storage.upload(dosyaYol,resim.file)
  yukleTask.snapshotChanges().pipe(
    finalize(()=>{
      storageRef.getDownloadURL().subscribe(downloadUrl=>{
        resim.url = downloadUrl
        resim.ad = resim.file.name
        this.REsimVeriKaydet(resim)
      })
    })
  ).subscribe()
  return yukleTask.percentageChanges()
}
REsimVeriKaydet(resim:Resim){
  return this.db.list(this.basePath).push(resim)
}

ResimBul(dosya:Resim){
  const storageRef = this.storage.ref(this.basePath)
  storageRef.child(dosya.url)
}
}
