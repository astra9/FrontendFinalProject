import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  public currentUser: any = null;
  
  constructor(
    private auth: AuthService,
    private router: Router
  ){}
  
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.auth.currentUser.pipe(
      map((currentUser) => !!currentUser),
      tap((loggedIn: any)=>{
        if(!loggedIn){
          this.router.navigate(['/signin'], {queryParams: {redirectUrl: state.url}})
        }
      })
    );
  }
  
}
