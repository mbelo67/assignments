import { Routes, RouterModule } from '@angular/router';
import { FrontLayoutComponent } from './layouts/front-layout/front-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
//import { TransactionsComponent } from './front/transactions/transactions.component';
//import { AddTransactionComponent } from './front/transactions/add-transaction/add-transaction.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ForbiddenComponent } from './errors/forbidden/forbidden.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';

const appRoutes: Routes = [
  //Site routes goes here 
  {
    path: '',
    component: FrontLayoutComponent, 
    /*canActivate: [AuthGuard],*/
    children: [
      { path: '', component: AppComponent, pathMatch: 'full' },
      /*{ path: 'transactions', component: TransactionsComponent, pathMatch: 'full' },
      { path: 'transactions/ajouter', component: AddTransactionComponent, pathMatch: 'full' },*/
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

  //no layout routes
  { path: 'login', component: LoginComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '/404' }
];

export const routing = RouterModule.forRoot(appRoutes);


