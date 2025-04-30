import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn=(route,state)=>{
  const authService=inject(AuthService);
  const router=inject(Router);

  if(!authService.isLoggedIn()){
    return true;//allow if not logged in
  }else{
    router.navigate(['/tasks']);
    return false;
  }
};
