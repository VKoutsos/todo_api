import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import {FormGroup,FormControl} from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';

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

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
  ){}

  register(): void{
    console.log('Register method called');
    this.authService.register({
      name: this.profileForm.get('name')?.value || '',
      email: this.profileForm.get('email')?.value || '',
      password: this.profileForm.get('password')?.value || ''
    }).subscribe(
      response=>{
        this.toastService.showSuccess('User registered successfully!');
        console.log('Registration successful',response);
        this.profileForm.reset();//clear the form fields
        this.errorMessage=null;//clear any previous error messages

        this.router.navigate(['/login']);
      },
      error=>{
        this.toastService.showError('Registration failed.');
        console.error('Registration failed',error);
        this.errorMessage=error.error.message||'Registration failed. Please try again.'//set error message
      }
    );
  }
}
