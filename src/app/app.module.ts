import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterUserComponent } from './users/register-user/register-user.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { JwtModule } from "@auth0/angular-jwt";
import { FormsModule } from '@angular/forms';
import { UserDashboardComponent } from './users/user-dashboard/user-dashboard.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorService } from './users/services/http-interceptor.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { AddressDashboardComponent } from './addresses/address-dashboard/address-dashboard.component';
import { EditAddressComponent } from './addresses/edit-address/edit-address.component';
import { EditAddressFormComponent } from './addresses/edit-address-form/edit-address-form.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { CustomerDashboardComponent } from './customers/customer-dashboard/customer-dashboard.component';
import { ConventionDashboardComponent } from './convention/convention-dashboard/convention-dashboard.component';
import { EditConventionComponent } from './convention/edit-convention/edit-convention.component';
import { AddConventionComponent } from './convention/add-convention/add-convention.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { ProductDashboardComponent } from './products/product-dashboard/product-dashboard.component';
import { OrderDashboardComponent } from './orders/order-dashboard/order-dashboard.component';
import { EditOrderComponent } from './orders/edit-order/edit-order.component';
import { AddOrderComponent } from './orders/add-order/add-order.component';
import { OrderErrorsComponent } from './orders/order-errors/order-errors.component';
import { NotificationComponent } from './notification/notification.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RegisterUserComponent,
    UserDashboardComponent,
    EditUserComponent,
    ForbiddenComponent,
    LoginComponent,
    WelcomeComponent,
    AddressDashboardComponent,
    EditAddressComponent,
    EditAddressFormComponent,
    EditCustomerComponent,
    AddCustomerComponent,
    CustomerDashboardComponent,
    ConventionDashboardComponent,
    EditConventionComponent,
    AddConventionComponent,
    AddProductComponent,
    EditProductComponent,
    ProductDashboardComponent,
    OrderDashboardComponent,
    EditOrderComponent,
    AddOrderComponent,
    OrderErrorsComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule, 
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatCheckboxModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["http://localhost:4200/", "https://localhost:44390/"],
        disallowedRoutes:[]
      }
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:  HttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
