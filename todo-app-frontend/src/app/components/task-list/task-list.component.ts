import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Subtask} from '../../models/subtask.model';
import { SubtaskService } from '../../services/subtask.service';
import { AuthService } from '../../services/auth.service';
import { MatCheckboxChange} from '@angular/material/checkbox';
import { ToastService} from '../../services/toast.service';
import { SocketService } from '../../services/socket.service';
import {HostListener, ElementRef} from '@angular/core';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  subtasks: Subtask[] = [];
  token: string | null = null;
  newTaskTitle: string='';
  newSubtaskTitle: { [taskId: number]: string } = {}; // subtask input tracking

  constructor(
    private taskService: TaskService,
    private subtaskService: SubtaskService,
    private authService: AuthService,
    private toastService: ToastService,
    private socketService: SocketService,
    private elRef: ElementRef,
  ) {}

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.loadTasks();

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
            this.tasks.unshift({
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

          //subtask created
          this.socketService.listen('subtask_created').subscribe((newSubtask: Subtask)=>{
            const task=this.tasks.find(t=>t.id===newSubtask.task_id);
            if(task){
              if(!task.subtasks) task.subtasks=[];
              task.subtasks.push(newSubtask);
              task.showDetails=true;

              this.toastService.showSuccess('A subtask was created by the admin!');
            }
          });

          //subtask deleted
          this.socketService.listen('subtask_deleted').subscribe((data:{subtaskId:number, taskId:number})=>{
            const task=this.tasks.find(t=>t.id===data.taskId);
            if(task&&task.subtasks){
              task.subtasks=task.subtasks.filter(s=>s.id!==data.subtaskId);
              this.toastService.showSuccess('A subtask was deleted by the admin!');
            }
          });

          //subtask updated
          this.socketService.listen('subtask_updated').subscribe((updatedSubtask: Subtask)=>{
            const task=this.tasks.find(t=>t.id===updatedSubtask.task_id);
            if (task&&task.subtasks){
              const subtaskIndex=task.subtasks.findIndex(t=>t.id===updatedSubtask.id);
              if(subtaskIndex!==-1){
                task.subtasks[subtaskIndex]={
                  ...task.subtasks[subtaskIndex],
                  ...updatedSubtask,
                  editing:false,
                  tempTitle:''
                };
                task.showDetails=true;

                this.toastService.showSuccess('A subtask was updated by the admin!');
              }
            }
          });
        },
        error: (err) => console.error('Error fetching tasks:', err)
      });
    } else {
      console.error('No token found. User may not be logged in.');
    }
  }

  //load tasks
  loadTasks():void{
    if(this.token){
      this.taskService.getTasks(this.token).subscribe({
        next:(data)=>{
          this.tasks=data.map(task=>({
            ...task, showDetails:false
          }));
          this.tasks.forEach(task=>{
            if(task.id){
              this.loadSubtasks(task);
            }
          });
        },
        error:(err)=>{console.error('Error fetching tasks:', err)}
      });
    }else{
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

  createTask():void{
    if(!this.newTaskTitle.trim()||!this.token) return;

    this.taskService.createTask({title:this.newTaskTitle.trim()},this.token).subscribe({
      next:()=>{
        this.toastService.showSuccess('Task created successfully.');
        this.newTaskTitle='';
        this.loadTasks();
      },
      error:(err)=>{
        this.toastService.showError('Error creating task');
        console.error('Error creating task:', err);
      }
    });
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

  startEdit(task:Task):void{
    task.editing=true;
    task.tempTitle=task.title;
  }

  cancelEdit(task:Task):void{
    task.editing=false;
    task.tempTitle='';
  }

  saveEdit(task: Task):void{
    if (!task.tempTitle?.trim()||!this.token){
      this.toastService.showError('Task title cannot be empty.');
      return;
    }
    const updatedTask={
      ...task,title:task.tempTitle.trim(),
      description:task.description||''
    };
    this.taskService.updateTask(updatedTask.id,updatedTask,this.token).subscribe({
      next:()=>{
        this.toastService.showSuccess('Task updated successfully.');
        task.title=updatedTask.title;
        task.editing=false;
        task.tempTitle='';
      },
      error:(err) => {
        this.toastService.showError('Error updating task');
        console.error('Error updating task:', err)
      }
    })
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
    const completed = event.checked;

    if (this.token) {
      const update$ = completed
        ? this.subtaskService.completeSubtask(subtaskId, this.token)
        : this.subtaskService.incompleteSubtask(subtaskId, this.token);

      update$.subscribe({
        next: () => {
          const task = this.tasks.find(t => t.id === taskId);
          const subtask = task?.subtasks?.find(s => s.id === subtaskId);
          if (subtask) {
            subtask.status = completed ? 'completed' : 'pending';
          }
        },
        error: (err) => console.error('Error updating subtask status:', err)
      });
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

  // --- Subtask In-place editing methods ---
  startEditSubtask(subtask: Subtask): void {
    subtask.editing = true;
    subtask.tempTitle = subtask.title;
  }

  cancelEditSubtask(subtask: Subtask): void {
    subtask.editing = false;
    subtask.tempTitle = '';
  }

  saveEditSubtask(taskId: number, subtask: Subtask): void {
    if (!subtask.tempTitle?.trim() || !this.token) {
      this.toastService.showError('Subtask title cannot be empty.');
      return;
    }

    const updatedSubtaskData: Partial<Subtask> = {
      id: subtask.id,
      title: subtask.tempTitle.trim(),
    };

    this.subtaskService.updateSubtask(subtask.id, updatedSubtaskData, this.token).subscribe({
      next: () => {
        this.toastService.showSuccess('Subtask updated successfully.');
        subtask.title = updatedSubtaskData.title!;
        subtask.editing = false;
        subtask.tempTitle = '';
      },
      error: (err) => {
        this.toastService.showError('Failed to update subtask.');
        console.error('Error updating subtask:', err);
      }
    });
  }

  @HostListener('document:click',['$event'])
  onClickOutside(event: MouseEvent): void {
    const clickedInside=this.elRef.nativeElement.contains(event.target);
    if(!clickedInside){
      this.closeAllSubtaskEdits();
    }
  }

  closeAllSubtaskEdits() {
    this.tasks.forEach(task => {
      task.subtasks?.forEach(subtask => {
        if (subtask.editing) {
          this.cancelEditSubtask(subtask);
        }
      });
    });
  }
}
