import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    //private authService: AuthService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //const authorized = this.authService.getToken(TokenEnum.ACCESS_TOKEN);

      //this.authService.setUrlRedirect(state.url || '/');

      // if (authorized) {
      //   return Promise.resolve(true);
      // }

      this.router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}});
      //this.authService.logout()
      //this.authService.clearStore();
      
      return Promise.resolve(false);
  }
}
