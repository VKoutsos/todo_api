import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from './services/socket.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Task Management';

  constructor(
    private socketService: SocketService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    //clear invalid token on startup
    if (this.authService.getToken() && !this.authService.isLoggedIn()){
      this.authService.logout();
      this.router.navigate(['/login']);
    }

    if (this.authService.isLoggedIn()){
      this.socketService.connect();
    }


    this.socketService.listen('task_created').subscribe((data) => {
      console.log('Task Created:', data);
    });

    this.socketService.listen('task_updated').subscribe((data) => {
      console.log('Task Updated:', data);
    });

    this.socketService.listen('task_deleted').subscribe((data) => {
      console.log('Task Deleted:', data);
    });

    this.socketService.listen('subtask_created').subscribe((data) => {
      console.log('Subtask Created:', data);
    });

    this.socketService.listen('subtask_deleted').subscribe((data) => {
      console.log('Subtask Deleted:', data);
    });

    this.socketService.listen('subtask_updated').subscribe((data) => {
      console.log('Subtask Updated:', data);
    });
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }
}
