import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService} from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-admin-detail',
  standalone: false,
  templateUrl: './admin-detail.component.html',
  styleUrl: './admin-detail.component.css'
})
export class AdminDetailComponent implements OnInit {
  tasks: Task[] = [];
  token: string | null = null;
  userId!: number;
  newSubtaskTitle: { [taskId: number]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.params['userId'];
    this.loadUserTasks();
  }

  loadUserTasks(): void {
    this.adminService.getUserTasks(this.userId).subscribe({
      next: (tasks) => {
        this.tasks = tasks.map((task:any) => ({
          ...task,
          showDetails: false,
          subtasks: [],
        }));
      },
      error: (err) => console.error('Failed to load tasks:', err),
    });
  }

  toggleDetails(task:any):void{
    task.showDetails=!task.showDetails;
    if(task.showDetails && task.subtasks.length===0){
      this.adminService.getUserSubtasks(this.userId).subscribe({
        next:(subtasks)=>{
          task.subtasks=subtasks.filter((st:any)=>st.task_id===task.id);
        },
        error:(err)=>console.error('Failed to load subtasks:',err),
      });
    }
  }

  deleteTask(taskId:number):void{
    this.adminService.deleteUserTask(this.userId,taskId).subscribe({
      next:()=>this.loadUserTasks(),
      error:(err)=>console.error('Error deleting task:',err),
    });
  }

  deleteSubtask(taskId:number,subtaskId:number):void{
    this.adminService.deleteUserSubtask(taskId,subtaskId).subscribe({
      next:()=>this.toggleDetails(this.tasks.find((t)=>t.id===taskId)),
    });
  }

  addSubtask(taskId:number):void{
    const title=this.newSubtaskTitle[taskId];
    if(!title) return;

    this.adminService.createUserSubtask(taskId,title,this.userId).subscribe({
      next:()=>{
        this.newSubtaskTitle[taskId]='';
        this.toggleDetails(this.tasks.find((t)=>t.id===taskId));
      },
      error:(err)=>console.error('Error adding subtask:',err),
    });
  }
}
