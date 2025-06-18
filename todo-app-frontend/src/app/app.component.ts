import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Task Management';

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.connect();

    this.socketService.listen('task_created').subscribe((data) => {
      console.log('Task Created:', data);
    });

    this.socketService.listen('task_updated').subscribe((data) => {
      console.log('Task Updated:', data);
    });

    this.socketService.listen('task_deleted').subscribe((data) => {
      console.log('Task Deleted:', data);
    });
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }
}
