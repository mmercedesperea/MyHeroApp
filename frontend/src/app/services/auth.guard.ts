import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) { }

  canActivate() {
    if (!this._userService.isLoggedIn()) {
      localStorage.clear();
      this._router.navigateByUrl('/login');
      return false;
    }

    return true;
  }

}
