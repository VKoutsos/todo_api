import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent} from './components/task-list/task-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard} from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { adminGuard } from './guards/admin.guard';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { TaskAddComponent} from './components/task-add/task-add.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminDetailComponent} from './components/admin-detail/admin-detail.component';
import { LogsComponent } from './components/logs/logs.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},//Redirect to log in by default
  {path:'login',component:LoginComponent, canActivate: [loginGuard]},
  {path:'register',component:RegisterComponent, canActivate: [loginGuard]},

  //Protected task routes
  {path:'tasks',component: TaskListComponent,canActivate: [authGuard]},//protect the tasks
  {path:'tasks/add',component: TaskAddComponent,canActivate: [authGuard]},
  {path:'tasks/edit/:id',component: TaskEditComponent, canActivate: [authGuard]},

  //protected log route
  {path:'users/logs',component:LogsComponent,canActivate: [authGuard]},

 //Protected admin routes
  {
    path: 'admin',
    canActivate: [authGuard,adminGuard],
    children: [
      {path: 'users', component: AdminUsersComponent},
      {path: 'users/:userId', component: AdminDetailComponent},
    ]
  },

  {path:'**',redirectTo:'/login'}, //Redirect to log in for any unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
