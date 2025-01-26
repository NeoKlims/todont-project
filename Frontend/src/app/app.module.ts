import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './assets/footer/footer.component';
import { HeroComponent } from './assets/hero/hero.component';
import { StatsComponent } from './assets/stats/stats.component';
import { HeaderComponent } from './assets/header/header.component';
import { FeaturedServicesComponent } from './assets/featured-services/featured-services.component';
import { ServicesComponent } from './assets/services/services.component';
import { CommunityListsComponent } from './assets/community-lists/community-lists.component';
import { ContactComponent } from './assets/contact/contact.component';
import { AboutComponent } from './assets/about/about.component';
import { HomeComponent } from './assets/home/home.component';
import { TodoListComponent } from './assets/todo-list/todo-list.component';
import { SidebarComponent } from './assets/sidebar/sidebar.component';
import { WorkspaceComponent } from './assets/workspace/workspace.component';
import { TaskService } from './services/task.service';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeroComponent,
    StatsComponent,
    HeaderComponent,
    FeaturedServicesComponent,
    ServicesComponent,
    CommunityListsComponent,
    ContactComponent,
    AboutComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TodoListComponent,
    SidebarComponent,
    WorkspaceComponent,
    RouterModule.forRoot([{ path: "", component: TodoListComponent }])
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
