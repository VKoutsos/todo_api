import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent{
  users: User[]=[];

  constructor(private adminService: AdminService){}

  ngOnInit(): void{
    this.adminService.getAllUsers().subscribe({
      next:(users:User[])=>{
        this.users=users.filter(user=>user.role==='user');
      },
      error:(err:any)=>{
        console.error('Error fetching users:',err);
      }
    });
  }
}
