import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { SubtaskService } from '../../services/subtask.service';
import { AuthService } from '../../services/auth.service';
import { MatCheckboxChange} from '@angular/material/checkbox';
import { ToastService} from '../../services/toast.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  token: string | null = null;
  newSubtaskTitle: { [taskId: number]: string } = {}; // subtask input tracking

  constructor(
    private taskService: TaskService,
    private subtaskService: SubtaskService,
    private authService: AuthService,
    private toastService: ToastService,
    private socketService: SocketService,
  ) {}

  ngOnInit(): void {
    this.token = this.authService.getToken();

    if (this.token) {
      this.taskService.getTasks(this.token).subscribe({
        next: (data) => {
          // Initialize tasks with showDetails set to false
          this.tasks = data.map(task => ({
            ...task,
            showDetails: false
          }));

          // Load subtasks for each task
          this.tasks.forEach(task => this.loadSubtasks(task));

          //connect socket after loading tasks
          this.socketService.connect();

          //task updated
          this.socketService.listen('task_updated').subscribe((updatedTask: Task)=>{
            const index=this.tasks.findIndex(t=>t.id===updatedTask.id);
            if(index!==-1){
              this.tasks[index]={
                ...this.tasks[index],
                ...updatedTask
              };
              this.toastService.showSuccess("A task was updated by the admin!");
            }
          });

          //task created
          this.socketService.listen('task_created').subscribe((newTask: Task)=>{
            this.tasks.push({
              ...newTask,
              showDetails:false
            });
            this.toastService.showSuccess('A new task was created by the admin!');
          });

          //task deleted
          this.socketService.listen('task_deleted').subscribe((data: {taskId:number})=>{
            this.tasks=this.tasks.filter(task=>task.id!==data.taskId);
            this.toastService.showSuccess('A task was deleted by the admin!');
          });

        },
        error: (err) => console.error('Error fetching tasks:', err)
      });
    } else {
      console.error('No token found. User may not be logged in.');
    }
  }

  // Toggle visibility of subtasks
  toggleDetails(task: Task): void {
    task.showDetails = !task.showDetails;
  }

  loadSubtasks(task: Task): void {
    if (this.token) {
      this.subtaskService.getSubtasks(task.id, this.token).subscribe({
        next: (subtasks) => {
          task.subtasks = subtasks;
        },
        error: (err) => console.error('Error fetching subtasks:', err)
      });
    }
  }

  deleteTask(taskId: number): void {
    if (!this.token) return;

    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId, this.token).subscribe({
        next: () => {
          this.toastService.showSuccess('Task deleted successfully.');
          this.tasks = this.tasks.filter(task => task.id !== taskId);
        },
        error: (err) => {
          this.toastService.showError('Error deleting task');
          console.error('Error deleting task:', err)
        }
      });
    }
  }

  onCompleteTask(taskId: number, event: MatCheckboxChange): void {
    const completed=event.checked;

    if (this.token) {
      const update$ = completed
        ? this.taskService.completeTask(taskId, this.token)
        : this.taskService.incompleteTask(taskId, this.token);

      update$.subscribe({
        next: () => {
          const task = this.tasks.find(t => t.id === taskId);
          if (task) {
            task.status = completed ? 'completed' : 'pending';
            //collapse dropdown when completed
            if (completed){
              task.showDetails = false;
            }
          }
        },
        error: (err) => console.error(`Error updating task status:`, err)
      });
    }
  }

  addSubtask(taskId: number): void {
    const description = this.newSubtaskTitle[taskId];
    if (!description || !this.token) return;

    this.subtaskService.createSubtask(taskId, { description }, this.token).subscribe({
      next: () => {
        this.toastService.showSuccess('Subtask added successfully.');
        this.newSubtaskTitle[taskId] = '';

        //automatically open the dropdown
        const task=this.tasks.find(t=>t.id===taskId);
        if (task) {
          task.showDetails = true;
        }

        this.subtaskService.getSubtasks(taskId, this.token!).subscribe({
          next: (subtasks) => {
            const task = this.tasks.find(t => t.id === taskId);
            if (task) {
              task.subtasks = subtasks;
            }
          },
          error: (err) => console.error('Error refreshing subtasks:', err)
        });
      },
      error: (err) => {
        this.toastService.showError('Error creating subtask.');
        console.error('Error creating subtask:', err)
      }
    });
  }

  completeSubtask(taskId: number, subtaskId: number, event: MatCheckboxChange): void {
    const completed=event.checked;

    if (this.token) {
      if (completed) {
        this.subtaskService.completeSubtask(subtaskId, this.token).subscribe({
          next: () => {
            const task = this.tasks.find(t => t.id === taskId);
            const subtask = task?.subtasks?.find(s => s.id === subtaskId);
            if (subtask) {
              subtask.status = 'completed';
            }
          },
          error: (err) => console.error('Error completing subtask:', err)
        });
      } else {
        console.log('Unchecking subtask - no incomplete API yet.');
      }
    }
  }

  deleteSubtask(taskId: number, subtaskId: number): void {
    if (this.token) {
      if (confirm('Are you sure you want to delete this subtask?')) {
        this.subtaskService.deleteSubtask(subtaskId, this.token).subscribe({
          next: () => {
            this.toastService.showSuccess('Subtask deleted successfully.');
            const task = this.tasks.find(t => t.id === taskId);
            if (task?.subtasks) {
              task.subtasks = task.subtasks.filter(s => s.id !== subtaskId);
            }
          },
          error: (err) => {
            this.toastService.showError('Error deleting subtask.', err)
            console.error('Error deleting subtask:', err)
          }
        });
      }
    }
  }
}
