import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  standalone: false,
  styleUrls: ['./admin-detail.component.css']
})
export class AdminDetailComponent implements OnInit {
  tasks: Task[] = [];
  userId!: number;
  newTaskTitle = '';
  newSubtaskTitles: { [taskId: number]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.params['userId'];
    this.loadTasks();
  }

  // Task Methods
  loadTasks(): void {
    this.adminService.getUserTasks(this.userId).subscribe({
      next: (tasks:Task[]) => {
        this.tasks = tasks.map(task => ({
          ...task,
          showDetails: false,
          subtasks: []
        }));
      },
      error: (err) => console.error('Failed to load tasks:', err)
    });
  }

  createTask(): void {
    if (!this.newTaskTitle) return;

    this.adminService.createUserTask({
      title: this.newTaskTitle,
      userId: this.userId
    }).subscribe({
      next: () => {
        this.newTaskTitle = '';
        this.loadTasks();
      },
      error: (err) => console.error('Error creating task:', err)
    });
  }

  updateTask(task: Task): void {
    this.adminService.updateUserTask(task.id, task).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error('Error updating task:', err)
    });
  }

  deleteTask(taskId: number): void {
    if (confirm('Delete this task?')) {
      this.adminService.deleteUserTask(this.userId, taskId).subscribe({
        next: () => this.loadTasks(),
        error: (err) => console.error('Error deleting task:', err)
      });
    }
  }

  // Subtask Methods
  toggleSubtasks(task: Task): void {
    task.showDetails = !task.showDetails;
    if (task.showDetails && !task.subtasks?.length) {
      this.loadSubtasks(task);
    }
  }

  loadSubtasks(task: Task): void {
    this.adminService.getUserSubtasks(this.userId).subscribe({
      next: (subtasks) => {
        task.subtasks = subtasks.filter((st: any) => st.task_id === task.id);
      },
      error: (err) => console.error('Failed to load subtasks:', err)
    });
  }

  createSubtask(taskId: number): void {
    const description = this.newSubtaskTitles[taskId];
    if (!description) return;

    this.adminService.createUserSubtask(taskId, description, this.userId).subscribe({
      next: () => {
        this.newSubtaskTitles[taskId] = '';
        const task = (this.tasks.find(t => t.id === taskId)!);
        if (task) this.loadSubtasks(task);
      },
      error: (err) => console.error('Error adding subtask:', err)
    });
  }

  updateSubtask(taskId: number, subtask: any): void {
    this.adminService.updateUserSubtask(taskId, subtask.id, subtask).subscribe({
      next: () => {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) this.loadSubtasks(task);
      },
      error: (err) => console.error('Error updating subtask:', err)
    });
  }

  deleteSubtask(taskId: number, subtaskId: number): void {
    if (confirm('Delete this subtask?')) {
      this.adminService.deleteUserSubtask(taskId, subtaskId).subscribe({
        next: () => {
          const task = this.tasks.find(t => t.id === taskId);
          if (task) this.loadSubtasks(task);
        },
        error: (err) => console.error('Error deleting subtask:', err)
      });
    }
  }
}
