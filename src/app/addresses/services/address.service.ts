import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressData } from '../models/address-data.model';
import { AddressModel } from '../models/address.model';
import { SelectAddressModel } from '../models/select-address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private source: string = 'https://localhost:44390/api/addresses/';

  constructor(private http: HttpClient) { }

  public GetAddresses(): Observable<any>{
    return this.http.get<AddressData[]>(
      this.source + 'GetAddresses'
    );
  }

  public DeleteAddress(id: string): Observable<any>{
    return this.http.delete<any>(this.source+'DeleteAddress/'+id);
  }

  public saveAddress(addressModel: AddressModel): Observable<any>{
    return this.http.put<AddressModel>(this.source+'SaveAddress', addressModel);
  }

  public GetSelectAddressModels(): Observable<any>{
    return this.http.get<SelectAddressModel[]>(
      this.source + 'GetAddresSelectModels'
    );
  }

}

