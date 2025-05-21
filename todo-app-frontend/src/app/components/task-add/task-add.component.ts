import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-task-add',
  standalone: false,
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css'
})
export class TaskAddComponent {
  title: string = '';
  description: string = '';

  constructor(private taskService: TaskService,
              private authService: AuthService,
              private router: Router,
              private toastService: ToastService) {
  }

  createTask(): void {
    const token = this.authService.getToken();
    if (!token) return;

    const newTask = {
      title: this.title,
      description: this.description
    };

    this.taskService.createTask(newTask, token).subscribe({
      next: (res) => {
        this.toastService.showSuccess('Task created successfully.');
        console.log('Task created:', res);
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        this.toastService.showError('Error creating task');
        console.error('Error creating task:', err)
      }
    });
  }
}
