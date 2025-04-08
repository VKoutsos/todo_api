import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email:string='';
  password:string='';

  constructor(private authService: AuthService){}

  register(): void{
    this.authService.register({email: this.email, password: this.password}).subscribe(
      response=>{
        console.log('Registration successful',response);
      },
      error=>{
        console.error('Registration failed',error);
      }
    );
  }
}
