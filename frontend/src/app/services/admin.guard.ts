import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

/**
 * Admin guard ,controls whether the user is an administrator or not
 */
@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {
  constructor(private _UserService: UserService, private _router: Router) { }

/**
 * @returns boolean, if the user is admin returns true if not false
 */
  canActivate(): boolean {

    /**
     * Store the user that is in the session
     */
    let identity = this._UserService.getIdentity();

    if (identity && identity.admin == 1) {
      return true
    } else {
      this._router.navigateByUrl('/');
      return false
    }
  }

}
