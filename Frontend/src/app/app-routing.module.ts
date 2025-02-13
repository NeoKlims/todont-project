import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { OurServicesPageComponent } from './our-services-page/our-services-page.component';
import { ForbiddenAccessComponent } from './forbidden-access/forbidden-access.component';
import { NotFoundComponent } from './not-found/not-found.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'workspace', component: WorkspaceComponent },
  { path: 'contact-us', component: ContactPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'services', component: OurServicesPageComponent },
  { path: 'reset-password', component: NewPasswordComponent },
  { path: 'forbidden-access', component: ForbiddenAccessComponent },
  { path: '**', component: NotFoundComponent } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
