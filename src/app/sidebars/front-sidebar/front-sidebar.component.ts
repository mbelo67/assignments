import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-front-sidebar',
  templateUrl: './front-sidebar.component.html',
  styleUrls: ['./front-sidebar.component.css']
})
export class FrontSidebarComponent implements OnInit {
  options: FormGroup;
  constructor(fb: FormBuilder) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0,
    });
  }

  ngOnInit(): void {
  }
  test(){
    console.log('test clicked');
  }

}
