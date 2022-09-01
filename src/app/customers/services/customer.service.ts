import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerData } from '../models/customer-data.model';
import { CustomerSelectModel } from '../models/customer-select.model';
import { CustomerModel } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private source: string = 'https://licenta-backend20220901215941.azurewebsites.net/api/customers/';
  
  constructor(private http: HttpClient) { }

  public GetCustomers(): Observable<any>{
    return this.http.get<CustomerData[]>(
      this.source + 'GetCustomers'
    );
  }

  public DeleteCustomer(id: string): Observable<any>{
    return this.http.delete<any>(this.source+'DeleteCustomer/'+id);
  }

  public saveCustomer(customerModel: CustomerModel): Observable<any>{
    return this.http.put<CustomerModel>(this.source+'AddEditCustomer', customerModel);
  }

  public GetSelectCustomerModels(): Observable<any>{
    return this.http.get<CustomerSelectModel[]>(
      this.source + 'GetCustomerSelectModels'
    );
  }

}
