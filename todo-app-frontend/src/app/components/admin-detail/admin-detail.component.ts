import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Task } from '../../models/task.model';
import { ToastService } from '../../services/toast.service';

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
  editingTaskId:number|null = null;
  tempTaskTitle='';

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private toastService: ToastService,
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
        this.toastService.showSuccess('Task created successfully.');
        this.loadTasks();
      },
      error: (err) => {
        this.toastService.showError('Failed to create task.');
        console.error('Error creating task:', err)
      }
    });
  }

  updateTask(task: Task): void {
    this.adminService.updateUserTask(task.id, task).subscribe({
      next: () => {
        this.toastService.showSuccess('Task updated successfully.');
        this.loadTasks()
      },
      error: (err) => {
        this.toastService.showError('Failed to update task.');
        console.error('Error updating task:', err)
      }
    });
  }

  deleteTask(taskId: number): void {
    if (confirm('Delete this task?')) {
      this.adminService.deleteUserTask(this.userId, taskId).subscribe({
          next: () => {
            this.tasks=this.tasks.filter(task => task.id !== taskId);
            this.toastService.showSuccess('Task deleted successfully.');
            this.loadTasks()
        },
        error: (err) => {
            this.toastService.showError('Error deleting task.');
            console.error('Error deleting task:', err)
        }
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
        this.toastService.showSuccess('Subtask created successfully.');
        this.newSubtaskTitles[taskId] = '';
        const task = (this.tasks.find(t => t.id === taskId)!);
        if (task) this.loadSubtasks(task);
      },
      error: (err) => {
        this.toastService.showError('Failed to create subtask.');
        console.error('Error adding subtask:', err)
      }
    });
  }

  updateSubtask(taskId: number, subtask: any): void {
    this.adminService.updateUserSubtask(taskId, subtask.id, subtask).subscribe({
      next: () => {
        this.toastService.showSuccess('Subtask updated successfully.');
        const task = this.tasks.find(t => t.id === taskId);
        if (task) this.loadSubtasks(task);
      },
      error: (err) => {
        this.toastService.showError('Failed to update subtask.');
        console.error('Error updating subtask:', err)
      }
    });
  }

  deleteSubtask(taskId: number, subtaskId: number): void {
    if (confirm('Delete this subtask?')) {
      this.adminService.deleteUserSubtask(taskId, subtaskId).subscribe({
        next: () => {
          this.toastService.showSuccess('Subtask deleted successfully.');
          const task = this.tasks.find(t => t.id === taskId);
          if (!task) return;

          task.subtasks=task.subtasks?.filter(st=>st.id!==subtaskId)||[];

          if(task.subtasks.length===0){
            task.showDetails = false;
          }
        },
        error: (err) => {
          this.toastService.showError('Failed to delete subtask.');
          console.error('Error deleting subtask:', err)
        }
      });
    }
  }

  startEdit(task:Task):void{
    this.editingTaskId=task.id;
    this.tempTaskTitle=task.title;
  }

  cancelEdit():void{
    this.editingTaskId=null;
  }

  saveEdit(task: Task):void{
    const updatedTask={...task,title:this.tempTaskTitle};
    this.adminService.updateUserTask(updatedTask.id,updatedTask).subscribe({
      next:()=>{
        this.toastService.showSuccess('Task updated successfully.');
        this.editingTaskId=null;
        this.loadTasks();
      },
      error:(err)=>{
        this.toastService.showError('Failed to update task.');
        console.error('Error updating task:', err)
      }
    });
  }
}
