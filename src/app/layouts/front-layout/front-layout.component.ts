import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-front-layout',
  templateUrl: './front-layout.component.html',
  styleUrls: ['./front-layout.component.css']
})
export class FrontLayoutComponent implements OnInit {

  title = 'management-front';
  options: FormGroup;
  @ViewChild('leftSidebar')
  private sidebarNav2!: MatSidenav;

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0,
    });
    console.log("front component");
  }

  ngOnInit(): void {
  }
  toggler(): void {
    this.sidebarNav2.toggle();
  }
}