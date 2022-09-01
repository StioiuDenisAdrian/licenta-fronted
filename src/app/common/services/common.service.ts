import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private source: string = 'https://licenta-backend20220901215941.azurewebsites.net/api/countries/';

  constructor(private httpClient: HttpClient) { }
  
  public getCountries(): Observable<any>{
    return this.httpClient.get<Country[]>(
      this.source+'GetCountries'
    );
  }
}
