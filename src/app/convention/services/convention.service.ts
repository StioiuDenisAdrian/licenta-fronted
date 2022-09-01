import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConventionData } from '../models/convention-data.model';
import { ConventionSelect } from '../models/convention-select.model';
import { ConventionModel } from '../models/convention.model';

@Injectable({
  providedIn: 'root'
})
export class ConventionService {
  private source: string = 'https://licenta-backend20220901215941.azurewebsites.net/api/conventions/';


  constructor(private httpClient: HttpClient) { }

  public getConventions(): Observable<any>{
    return this.httpClient.get<ConventionData[]>(
      this.source + 'GetConventions'
    );
  }

  public deleteConvention(id: string): Observable<any>{
    return this.httpClient.delete<any>(this.source+'DeleteConvention/'+id);
  }

  public saveConvention(conventionModel: ConventionModel): Observable<any>{
    return this.httpClient.put<ConventionModel>(this.source+'AddEditConvention', conventionModel);
  }

  public getSelectConventionModel(): Observable<any>{
    return this.httpClient.get<ConventionSelect[]>(
      this.source + 'GetConventionsForSelect'
    );
  }

  public getConvention(id: string): Observable<any>{
    return this.httpClient.get<any>(this.source+'GetConvention/'+id);
  }

}
