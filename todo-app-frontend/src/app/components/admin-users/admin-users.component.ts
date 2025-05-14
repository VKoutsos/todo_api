import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { User } from '../../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-users',
  standalone: false,
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent{
  users: User[]=[];
  displayedColumns: string[]=['id','username','email','created_at'];

  constructor(private adminService: AdminService,
              private router: Router
  ){}

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

  goToUser(id:number):void{
    this.router.navigate(['/admin/users',id]);
  }
}
