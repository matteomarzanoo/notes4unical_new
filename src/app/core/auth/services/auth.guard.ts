import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service'; // Servizio che gestisce l'autenticazione

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService, 
    private router: Router
  ) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.authService.isLoggedIn() ? true : this.router.navigate(['/login'])
  }
}
