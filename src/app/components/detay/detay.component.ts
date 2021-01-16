import { Kitap } from './../../models/kitap';
import { FbservisService } from 'src/app/services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detay',
  templateUrl: './detay.component.html',
  styleUrls: ['./detay.component.css']
})
export class DetayComponent implements OnInit {
  key: string;
  secKitap: Kitap=new Kitap()
  constructor(public route:ActivatedRoute,public fbservis:FbservisService,public router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(d=>{
      this.key = d.key
    })
    this.KitapGetir()
  }
  KitapGetir(){
    this.fbservis.KitapByKey(this.key).snapshotChanges().subscribe(d=>{
      const k = {...(d.payload.toJSON() as Kitap),key:this.key};
      this.secKitap = k
    })
  }
}
