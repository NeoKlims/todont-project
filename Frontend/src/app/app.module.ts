import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeroComponent } from './hero/hero.component';
import { StatsComponent } from './stats/stats.component';
import { HeaderComponent } from './header/header.component';
import { FeaturedServicesComponent } from './featured-services/featured-services.component';
import { CommunityListsComponent } from './community-lists/community-lists.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HttpClientModule } from '@angular/common/http';
import { NewPasswordComponent } from './new-password/new-password.component';
import { OurServicesComponent } from './our-services/our-services.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeroComponent,
    StatsComponent,
    HeaderComponent,
    FeaturedServicesComponent,
    CommunityListsComponent,
    ContactComponent,
    AboutComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    OurServicesComponent,
    
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TodoListComponent,
    SidebarComponent,
    WorkspaceComponent,
    RouterModule.forRoot([{ path: '', component: TodoListComponent }]),
  ],
  providers: [provideClientHydration(withEventReplay())],
  bootstrap: [AppComponent],
})
export class AppModule {}
