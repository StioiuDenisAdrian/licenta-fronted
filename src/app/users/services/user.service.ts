import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { UserRegistration } from '../models/user-registration.model';
import { UserData } from '../models/user-data.model';
import { UserModel } from '../models/user.model';
import { UserAuthentication } from '../models/user-authentication.model';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private source: string = 'https://licenta-backend20220901215941.azurewebsites.net/api/users/';
  private authChangeSub = new Subject<boolean>();
  public authChanged = this.authChangeSub.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  public registerUser(userRegistration: UserRegistration): Observable<any> {
    return this.http.post<UserRegistration>(
      this.source + 'Registration',
      userRegistration
    );
  }

  public getUsers(): Observable<any>{
    return this.http.get<UserData[]>(
      this.source+'GetUsers'
    );
  }

  public deleteUser(id: string):Observable<any>{
    return this.http.delete<any>(this.source+'DeleteUser/'+id);
  }

  public saveUser(userModel: UserModel): Observable<any>{
    return this.http.put<UserModel>(this.source+'/accounts/SaveUser', userModel);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  };

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  };

  public login(userAuthentication: UserAuthentication): Observable<any> {
    return this.http.post<UserAuthentication>(
      this.source + 'Login',
      userAuthentication
    );
  }

  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.sendAuthStateChangeNotification(false);
  };

  public isManager(): boolean {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token?.valueOf());
    const role =
      decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];

    return role === 'Manager';
  }

  public isUserManager(): boolean {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token?.valueOf());
    const role =
      decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];

    return role === 'User Manager';
  }

  public isProductSpecialist(): boolean {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token?.valueOf());
    const role =
      decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];

    return role === 'Product Specialist';
  }

  public isOrderManager(): boolean {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token?.valueOf());
    const role =
      decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];

    return role === 'Order Manager';
  }

  public isDriver(): boolean {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token?.valueOf());
    const role =
      decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];

    return role === 'Driver';
  }
}
