import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor( private authService: AuthService,
               private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verficaAutenticacion()
        .pipe(
          tap( estaAutenticado => {
            if(!estaAutenticado){
              this.router.navigate(['./auth/login'])
            }
          } )
        );

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean  {

      return this.authService.verficaAutenticacion()
        .pipe(
          tap( estaAutenticado => {
            if(!estaAutenticado){
              this.router.navigate(['./auth/login'])
            }
          } )
        );

  }
}
