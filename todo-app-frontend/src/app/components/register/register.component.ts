import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import {FormGroup,FormControl} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  profileForm=new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  errorMessage:string|null=null;//to hold error message

  constructor(private authService: AuthService){}

  register(): void{
    console.log('Register method called');
    this.authService.register({
      name: this.profileForm.get('name')?.value || '',
      email: this.profileForm.get('email')?.value || '',
      password: this.profileForm.get('password')?.value || ''
    }).subscribe(
      response=>{
        console.log('Registration successful',response);
        this.profileForm.reset();//clear the form fields
        this.errorMessage=null;//clear any previous error messages
      },
      error=>{
        console.error('Registration failed',error);
        this.errorMessage=error.error.message||'Registration failed. Please try again.'//set error message
      }
    );
  }
}
