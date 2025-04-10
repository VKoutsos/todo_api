import { Component, OnInit } from '@angular/core';
import { TaskService} from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  token: string | null = null;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');

    if (this.token) {
      this.taskService.getTasks(this.token).subscribe({
        next: (data) => this.tasks = data,
        error: (err) => console.error('Error fetching tasks:', err)
      });
    } else {
      console.error('No token found. User may not be logged in.')
    }
  }
}
