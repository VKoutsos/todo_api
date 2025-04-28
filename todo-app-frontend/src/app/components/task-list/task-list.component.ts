import { Component, OnInit } from '@angular/core';
import { TaskService} from '../../services/task.service';
import { Task } from '../../models/task.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  token: string | null = null;

  constructor(private taskService: TaskService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.token = this.authService.getToken();

    if (this.token) {
      this.taskService.getTasks(this.token).subscribe({
        next: (data) => this.tasks = data,
        error: (err) => console.error('Error fetching tasks:', err)
      });
    } else {
      console.error('No token found. User may not be logged in.')
    }
  }

  deleteTask(taskId: number): void {
    const token = this.authService.getToken();
    if (!token) return;

    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId, token).subscribe({
        next: () => {
          console.log('Task deleted');
          this.tasks = this.tasks.filter(task => task.id !== taskId);//update ui
        },
        error: (err) => console.error('Error deleted task:', err)
      });
    }
  }

  onCompleteTask(taskId: number, event: Event): void {
    const checkbox = event.target as HTMLInputElement; // Cast to HTMLInputElement
    const completed = checkbox.checked; // Get the checked state

    if (completed && this.token) {
      this.taskService.completeTask(taskId, this.token).subscribe({
        next: () => {
          const task = this.tasks.find(t => t.id === taskId);
          if (task) {
            task.status = 'completed';
          }
        },
        error: (err) => console.error('Error completing task:', err)
      });
    } else if (!completed) {
      // Handle the case where the task is marked as not completed
      const task = this.tasks.find(t => t.id === taskId);
      if (task) {
        task.status = 'pending'; // or whatever status you use for incomplete tasks
      }
    }
  }
}
