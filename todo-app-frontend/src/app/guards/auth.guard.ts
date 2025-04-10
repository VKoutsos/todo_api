import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService=inject(AuthService);
  const router=inject(Router);

  if(authService.isLoggedIn()){
    return true;//allow access if authenticated
  }else{
    router.navigate(['/login']);//redirect to log in if not authenticated
    return false;
  }
};
