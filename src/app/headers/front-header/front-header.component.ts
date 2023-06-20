import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-front-header',
  templateUrl: './front-header.component.html',
  styleUrls: ['./front-header.component.css']
})
export class FrontHeaderComponent implements OnInit {
  @Output() toggleNav = new EventEmitter();
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  toggleSideNav(e:any){
    this.toggleNav.emit(e);
  }

  logout(){
    this.authService.logOut();
  }
}
