import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../users/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public isAuthenticated: boolean = false;
  public canViewClients: boolean = false;
  public canViewAddresses: boolean = false;
  public canViewCustomers: boolean = false;
  public canViewConventions: boolean = false;
  public canViewProducts: boolean = false;
  public canViewOrders: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.userService.isUserAuthenticated();
    this.canViewClients =
      this.userService.isUserManager() || this.userService.isManager();
    this.canViewAddresses =
      this.userService.isOrderManager() || this.userService.isManager();
    this.canViewCustomers =
      this.userService.isOrderManager() || this.userService.isManager();
    this.canViewConventions =
      this.userService.isOrderManager() || this.userService.isManager();
    this.canViewProducts =
      this.userService.isOrderManager() || this.userService.isManager();
    this.canViewOrders =
      this.userService.isOrderManager() || this.userService.isManager();
  }

  navigateToUsersDashboard(): void {
    this.router.navigate(['../users']);
  }

  navigateToAddressDashboard(): void {
    this.router.navigate(['../addresses']);
  }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/login').then(() => {
      window.location.reload();
    });
  }
  navigateToCustomerDashboard(): void {
    this.router.navigateByUrl('/customers').then(() => {});
  }

  navigateToConventionDashboard(): void {
    this.router.navigateByUrl('/conventions').then(() => {});
  }

  navigateToProductDashboard(): void {
    this.router.navigateByUrl('/products').then(() => {});
  }

  navigateToOrderDashboard(): void {
    this.router.navigateByUrl('/orders').then(() => {});
  }
}
