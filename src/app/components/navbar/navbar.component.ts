import { Router } from '@angular/router';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public fbservis: FbservisService,public router:Router) { }
  adminControl:boolean = false
  ngOnInit(): void {   
  }
  OturumKapat(){
    this.fbservis.OturumKapa()
    localStorage.removeItem("user")
    this.router.navigate(['/login'])
  }
}
