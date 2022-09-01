import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductData } from '../models/product-data.model';
import { ProductSelect } from '../models/product-select.model';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private source: string = 'https://localhost:44390/api/products/';

  constructor(private httpClient: HttpClient) {}

  public getProducts(): Observable<any> {
    return this.httpClient.get<ProductData[]>(this.source + 'GetProducts');
  }

  public deleteProduct(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.source + 'DeleteProduct/' + id);
  }

  public saveProduct(productModel: ProductModel): Observable<any> {
    return this.httpClient.put<ProductModel>(
      this.source + 'AddEditProduct',
      productModel
    );
  }

  public getSelectProductModel(): Observable<any> {
    return this.httpClient.get<ProductSelect[]>(
      this.source + 'GetProductsForSelect'
    );
  }

  public getProduct(id: string): Observable<any> {
    return this.httpClient.get<any>(this.source + 'GetProduct/' + id);
  }
}
