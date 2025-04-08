import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskListComponent} from './components/task-list/task-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path:'tasks',component: TaskListComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'},//Redirect to log in by default
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'**',redirectTo:'/login'}//Redirect to log in for any unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
