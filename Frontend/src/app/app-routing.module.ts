import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './assets/about/about.component';
import { HomeComponent } from './assets/home/home.component';
import { TodoListComponent } from './assets/todo-list/todo-list.component';
import { WorkspaceComponent } from './assets/workspace/workspace.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent }, 
  { path: 'workspace', component: WorkspaceComponent }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
