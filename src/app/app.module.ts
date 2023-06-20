import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AssignmentsComponent } from './assignments/assignments.component';
//import { RenduDirective } from './shared/rendu.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
//import { authGuard } from './shared/auth.guard';
import { LoginComponent } from './login/login.component';
import { FrontLayoutComponent } from './layouts/front-layout/front-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FrontHeaderComponent } from './headers/front-header/front-header.component';
import { AdminHeaderComponent } from './headers/admin-header/admin-header.component';
import { FrontSidebarComponent } from './sidebars/front-sidebar/front-sidebar.component';
import { AdminSidebarComponent } from './sidebars/admin-sidebar/admin-sidebar.component';
import { FrontFooterComponent } from './footers/front-footer/front-footer.component';
import { AdminFooterComponent } from './footers/admin-footer/admin-footer.component';
import { MaterialCustomModule } from '../material.module';
import { AssignmentsFrontComponent } from './assignments/assignments-front/assignments-front.component'

import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';

import { routing } from './app.routing.module'
import { TokenInterceptor } from './middleware/interceptor';


@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    LoginComponent,
    AdminLayoutComponent,
    FrontLayoutComponent,
    FrontHeaderComponent,
    AdminHeaderComponent,
    FrontSidebarComponent,
    AdminSidebarComponent,
    FrontFooterComponent,
    AdminFooterComponent,
    AssignmentsFrontComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpClientModule,
    MaterialCustomModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AuthService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

console.log("app module")