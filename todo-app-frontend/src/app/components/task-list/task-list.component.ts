import { Component, OnInit } from '@angular/core';
import { TaskService} from '../../services/task.service';
import { Task } from '../../models/task.model';
import { SubtaskService } from '../../services/subtask.service';
import { Subtask } from '../../models/subtask.model';
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
  newSubtaskTitle:{[taskId:number]:string}={};//store subtasks input per task

  constructor(
    private taskService: TaskService,
    private subtaskService: SubtaskService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.token = this.authService.getToken();

    if (this.token) {
      this.taskService.getTasks(this.token).subscribe({
        next: (data) =>
        { this.tasks = data;
        //after loading tasks, load subtasks for each task
        this.tasks.forEach(task=>this.loadSubtasks(task));},
        error: (err) => console.error('Error fetching tasks:', err)
      });
    } else {
      console.error('No token found. User may not be logged in.')
    }
  }

  loadSubtasks(task:Task):void{
    if (this.token){
      this.subtaskService.getSubtasks(task.id,this.token).subscribe({
        next:(subtasks)=>{
          task.subtasks=subtasks;
        },
        error:(err)=>console.error('Error fetching subtasks:', err)
      });
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
    const checkbox = event.target as HTMLInputElement;
    const completed = checkbox.checked;

    if (this.token) {
      if (completed) {
        this.taskService.completeTask(taskId, this.token).subscribe({
          next: () => {
            const task = this.tasks.find(t => t.id === taskId);
            if (task) {
              task.status = 'completed';
            }
          },
          error: (err) => console.error('Error completing task:', err)
        });
      } else {
        this.taskService.incompleteTask(taskId, this.token).subscribe({
          next: () => {
            const task = this.tasks.find(t => t.id === taskId);
            if (task) {
              task.status = 'pending';
            }
          },
          error: (err) => console.error('Error incompleting task:', err)
        });
      }
    }
  }

  addSubtask(taskId:number):void{
    const title=this.newSubtaskTitle[taskId];
    if(title&&this.token){
      const newSubtask: Partial<Subtask>={
        title,
        description:'',
        status:'pending',
        task_id:taskId
      };
      this.subtaskService.createSubtask(taskId,newSubtask,this.token).subscribe({
        next:()=>{
          this.loadSubtasks(this.tasks.find(t=>t.id===taskId)!);//reload subtasks
          this.newSubtaskTitle[taskId]='';//clear input
        },
        error:(err)=>console.error('Error creating subtask:',err)
      });
    }
  }

  completeSubtask(taskId:number,subtaskId:number,completed:boolean):void{
    if(this.token){
      if(completed){
        this.subtaskService.completeSubtask(subtaskId,this.token).subscribe({
          next:()=>{
            const task=this.tasks.find(t=>t.id===taskId);
            const subtask=task?.subtasks?.find(s=>s.id===subtaskId);
            if(subtask){
              subtask.status='completed';
            }
          },
          error:(err)=>console.error('Error completing subtask:',err)
        });
      }else{
        //implement "incomplete" subtask feature here
        console.log('Unchecking subtask - no incomplete API yet.');
      }
    }
  }

  deleteSubtask(taskId:number,subtaskId:number):void{
    if(this.token){
      if(confirm('Are you sure you want to delete this subtask?')){
        this.subtaskService.deleteSubtask(subtaskId,this.token).subscribe({
          next:()=>{
            const task=this.tasks.find(t=>t.id===taskId);
            if(task?.subtasks){
              task.subtasks=task.subtasks.filter(s=>s.id!==subtaskId);
            }
          },
          error:(err)=>console.error('Error deleting subtask:',err)
        });
      }
    }
  }
}
