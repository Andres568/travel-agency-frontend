import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/sign-in']);
      return false;
    }

    const roles = next.data['roles'] as [];
    console.log(roles);
    for (let role of roles) {
      if (this.authService.hasRole(role)) {
        return true;
      }
    }
    Swal.fire('Acceso denegado', `Hola ${this.authService.user.username} no tienes acceso a este recurso!`, 'warning');
    this.router.navigate(['/home']);
    return false;
  }
}
