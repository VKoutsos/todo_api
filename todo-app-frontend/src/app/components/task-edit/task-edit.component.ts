import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service'
import { AuthService } from '../../services/auth.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-edit',
  standalone: false,
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent implements OnInit {
  taskId!:number;
  title:string='';
  description:string='';

  constructor(private route:ActivatedRoute,private taskService:TaskService,private authService: AuthService, private router:Router) {}

  ngOnInit():void{
    this.taskId=Number(this.route.snapshot.paramMap.get('id'));//fetch the task details first
  }

  updateTask():void{
    const token=this.authService.getToken();
    if (!token) return;

    const updatedTask={
      title:this.title,
      description:this.description
    };

    this.taskService.updateTask(this.taskId, updatedTask, token).subscribe({
      next:(res)=>{
        console.log('Task updated:',res);
        this.router.navigate(['/tasks']);
      },
      error:(err)=>console.error('Error updating task:',err)
    });
  }
}
