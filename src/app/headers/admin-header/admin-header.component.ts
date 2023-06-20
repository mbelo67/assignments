import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css','../../admin/admin.component.css']
})
export class AdminHeaderComponent implements OnInit {
  @Output() toggleNav = new EventEmitter();
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  toggleSideNav(e:any){
    this.toggleNav.emit(e);
  }
  logout(){
    this.authService.logOut();
  }
}
