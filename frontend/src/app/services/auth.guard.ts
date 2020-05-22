import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

/**
* Auth guard ,controls whether the user is identified or not
*/
@Injectable({
  providedIn: 'root'
})

/**
* Auth guard ,controls whether the user is identified or not
*/
export class AuthGuard implements CanActivate {
  /**
    * Constructor in which we inject User Service and Router service
    */
  constructor(private _userService: UserService, private _router: Router) { }

  /**
   * @returns boolean, if the user is identified returns true if not false
   */
  canActivate(): boolean {
    if (!this._userService.isLoggedIn()) {
      localStorage.clear();
      this._router.navigateByUrl('/login');
      return false;
    }

    return true;
  }

}
