import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService} from '../services/auth.service';
import { inject } from '@angular/core';

export const adminGuard:CanActivateFn=()=>{
  const authService=inject(AuthService);
  const router=inject(Router);

  if(authService.isLoggedIn() && authService.isAdmin()){
    return true;//allow if user is admin
  }else{
    router.navigate(['/tasks']);
    return false;//redirect if not admin
  }
};

