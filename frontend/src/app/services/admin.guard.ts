import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _UserService: UserService, private _router: Router) { }

  canActivate(
  ) {
    let identity = this._UserService.getIdentity();
    
    if (identity && identity.admin == 1) {
      return true
    } else {
      this._router.navigateByUrl('/');
      return false
    }
  }

}
