import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductSpecialistGuardService implements CanActivate{

  constructor(private readonly authenticationService: UserService,
              private readonly router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
     if(this.authenticationService.isProductSpecialist()){
         return true;
     }
     return false;
  }
}
