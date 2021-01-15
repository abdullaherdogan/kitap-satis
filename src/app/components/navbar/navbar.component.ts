import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public fbservis: FbservisService) { }
  adminControl:boolean = false
  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem("user"))
    if (user.email =="admin@admin.com") {
      this.adminControl = true
    } else {
      this.adminControl = false
    }
  }
  OturumKapat(){
    this.fbservis.OturumKapa()
    localStorage.removeItem("user")
  }
}
