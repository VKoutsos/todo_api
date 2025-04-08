import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
email:string='';
password:string='';

constructor(private authService: AuthService, private router: Router){}

  login():void{
  this.authService.login({email:this.email,password:this.password}).subscribe(
    response=>{
      this.authService.setToken(response.token);
      this.router.navigate(['/tasks']);
    },
    error=>{
      console.error('Login failed',error);
    }
  );
  }
}
