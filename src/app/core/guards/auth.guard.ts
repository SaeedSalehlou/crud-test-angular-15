import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {


  }
  canActivate() {

    if (!this.usersService.isLoggedIn()) {
      this.router.navigate(['auth/login']);
      return false;
    }
    return true;

  }

}
