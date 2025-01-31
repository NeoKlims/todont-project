import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { TodoPageComponent } from './todo-page/todo-page.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { ServicesComponent } from './services/services.component';
import { NewPasswordComponent } from './new-password/new-password.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'workspace/:token', component: WorkspaceComponent },
  { path: 'contact-us', component: ContactComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'reset-password', component: NewPasswordComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
