import { Routes, RouterModule } from '@angular/router';
import { FrontLayoutComponent } from './layouts/front-layout/front-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ForbiddenComponent } from './errors/forbidden/forbidden.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { AssignmentsFrontComponent } from './assignments/assignments-front/assignments-front.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AssignmentsComponent } from './assignments/assignments.component';

const appRoutes: Routes = [
  //Site routes goes here 
  {
    path: '',
    component: FrontLayoutComponent, 
    /*canActivate: [AuthGuard],*/
    children: [
      { path: '', component: AppComponent, pathMatch: 'full' },
      { path: '403', component: ForbiddenComponent, pathMatch: 'full' },
      { path: '404', component: NotFoundComponent, pathMatch: 'full' },
      { path: '500', component: ServerErrorComponent, pathMatch: 'full' },
    ]
  },
  {
    path: 'test',
    component: AppComponent,
    children: [
      { path: '', component: FrontLayoutComponent, pathMatch: 'full' },
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: AppComponent, pathMatch: 'full' },
    ]
  },
  {
    path: 'assignments-etudiant',
    component: AssignmentsFrontComponent
  },
  {
    path: 'add',
    component: AddAssignmentComponent
  },
  {
    path: 'assignments/:id',
    component: AssignmentDetailComponent
  },
  {
    path: 'assignments/:id/edit',
    component: EditAssignmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: AppComponent, pathMatch: 'full' },
      { path: 'assignments', component: AssignmentsComponent, pathMatch: 'full' }
    ]
  },

  //no layout routes
  { path: 'login', component: LoginComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '/404' },

];

export const routing = RouterModule.forRoot(appRoutes);
