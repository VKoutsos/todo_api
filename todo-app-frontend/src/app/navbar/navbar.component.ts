import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public authService: AuthService,
              private router: Router,
              private toastService: ToastService,
              private socketService: SocketService
  ){}

  get isAdmin():boolean{
    return this.authService.isAdmin();
  }

  logout():void{
    this.authService.logout();
    this.socketService.disconnect();
    this.toastService.showSuccess('User logged out.');
    this.router.navigate(['/login']);
  }
}
