import { Component } from '@angular/core';
import { AuthService,LoginUser } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginForm: FormGroup;
errorMessage:string|null=null;

constructor(private authService: AuthService, private router: Router){
  this.loginForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required]),
    rememberMe: new FormControl(false)
  });
}

  login():void{
    if(this.loginForm.invalid){
      return;//optionally handle invalid form
    }

  const user:LoginUser={
    email:this.loginForm.get('email')?.value || '',
    password:this.loginForm.get('password')?.value || ''
  };

  this.authService.login(user).subscribe(
    response=>{
      this.authService.setToken(response.token);
      this.errorMessage=null;//clear any previous error message
      this.loginForm.reset();

      this.router.navigate(['/tasks']);
    },
    error=>{
      console.error('Login Failed',error);
      this.errorMessage='Invalid email or password. Please try again.';//set error message

      this.loginForm.get('password')?.reset('');
    }
  );
  }
}
