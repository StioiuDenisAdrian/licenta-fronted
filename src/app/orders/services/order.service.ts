import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderData } from '../models/order-data.model';
import { OrderModel } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private source: string = 'https://licenta-backend20220901215941.azurewebsites.net/api/orders/';

  constructor(private http: HttpClient) {}

  public getOrders(): Observable<any> {
    return this.http.get<OrderData[]>(this.source + 'GetOrders');
  }

  public saveOrder(orderModel: OrderModel): Observable<any> {
    return this.http.put<OrderModel>(this.source + 'AddEditOrder', orderModel);
  }

  public getOrder(id: string): Observable<any> {
    return this.http.get<OrderModel[]>(this.source + 'GetOrder/' + id);
  }
}
