import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressDashboardComponent } from './addresses/address-dashboard/address-dashboard.component';
import { AppComponent } from './app.component';
import { ConventionDashboardComponent } from './convention/convention-dashboard/convention-dashboard.component';
import { CustomerDashboardComponent } from './customers/customer-dashboard/customer-dashboard.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { OrderDashboardComponent } from './orders/order-dashboard/order-dashboard.component';
import { ProductDashboardComponent } from './products/product-dashboard/product-dashboard.component';
import { GuardService } from './users/services/guard.service';
import { ManagerGuardService } from './users/services/manager-guard.service';
import { OrderManagerGuardService } from './users/services/order-manager-guard.service';
import { UserManagerGuardService } from './users/services/user-manager-guard.service';
import { UserDashboardComponent } from './users/user-dashboard/user-dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserDashboardComponent,
    canActivate: [GuardService],
    children: [
      {
        path: 'users',
        canActivate: [UserManagerGuardService],
        component: UserDashboardComponent,
      },
      {
        path: 'users',
        canActivate: [ManagerGuardService],
        component: UserDashboardComponent,
      },
    ],
  },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [GuardService] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'addresses',
    component: AddressDashboardComponent,
    canActivate: [GuardService],
    children: [
      {
        path: 'addresses',
        canActivate: [OrderManagerGuardService],
        component: AddressDashboardComponent,
      },
      {
        path: 'addresses',
        canActivate: [ManagerGuardService],
        component: AddressDashboardComponent,
      },
    ],
  },
  {
    path: 'customers',
    component: CustomerDashboardComponent,
    canActivate: [GuardService],
    children: [
      {
        path: 'customers',
        canActivate: [OrderManagerGuardService],
        component: CustomerDashboardComponent,
      },
      {
        path: 'customers',
        canActivate: [ManagerGuardService],
        component: CustomerDashboardComponent,
      },
    ],
  },
  {
    path: 'conventions',
    component: ConventionDashboardComponent,
    canActivate: [GuardService],
    children: [
      {
        path: 'conventions',
        canActivate: [OrderManagerGuardService],
        component: ConventionDashboardComponent,
      },
      {
        path: 'conventions',
        canActivate: [ManagerGuardService],
        component: ConventionDashboardComponent,
      },
    ],
  },
  {
    path: 'products',
    component: ProductDashboardComponent,
    canActivate: [GuardService],
    children: [
      {
        path: 'products',
        canActivate: [OrderManagerGuardService],
        component: ProductDashboardComponent,
      },
      {
        path: 'products',
        canActivate: [ManagerGuardService],
        component: ProductDashboardComponent,
      },
    ],
  },
  {
    path: 'orders',
    component: OrderDashboardComponent,
    canActivate: [GuardService],
    children: [
      {
        path: 'orders',
        canActivate: [OrderManagerGuardService],
        component: OrderDashboardComponent,
      },
      {
        path: 'orders',
        canActivate: [ManagerGuardService],
        component: OrderDashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
