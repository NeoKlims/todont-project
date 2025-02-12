import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TodontService } from '../services/todont.service';
import { catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [CommonModule, TodoListComponent, SidebarComponent],
  templateUrl: './workspace.component.html',
  styleUrls: [`./workspace.component.css`],
})
export class WorkspaceComponent implements OnInit {
  todoLists$: any;
  todontLists$: any;
  showTodont = false;
  token: string | null = '';
  workspaceData: any;
  isLoading = true;

  constructor(
    private todoService: TodoService,
    private todontService: TodontService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.authService.getCurrentUser(); 
    if (this.token) {
      this.loadLists();
    } else {
      console.error('Authentication token is not available');
      this.router.navigate(['/forbidden-access'])
    }
      /*this.todoLists$ = this.todoService.getTodoLists().pipe(
        tap(() => (this.isLoading = false)), // Update loading state
        catchError(() => {
          this.isLoading = false; // Handle error and update loading state
          return of([]);
        })
      );*/
  }

  toggleListType(showTodont: boolean): void {
    this.showTodont = showTodont;
    this.loadLists(); // Reload lists when toggle changes
  }

  /*private loadLists() {
    if (this.showTodont) {
      this.todontLists$ = this.todontService.getTodontLists().pipe(
        catchError(error => {
          console.error('Error loading Todont lists:', error);
          return of([]); // Return an empty array in case of error
        })
      );
    } else {
      this.todoLists$ = this.todoService.getTodoLists().pipe(
        catchError(error => {
          console.error('Error loading Todo lists:', error);
          return of([]); // Return an empty array in case of error
        })
      );
    }
  }*/
    private loadLists() {
      if (this.showTodont) {
        this.todontLists$ = this.todontService.getTodontLists().pipe(
          tap(() => (this.isLoading = false)), // Update loading state
          catchError(() => {
            this.isLoading = false; // Handle error and update loading state
            return of([]);
          })
        );
      } else {
        this.todoLists$ = this.todoService.getTodoLists().pipe(
          tap(() => (this.isLoading = false)), // Update loading state
          catchError(() => {
            this.isLoading = false; // Handle error and update loading state
            return of([]);
          })
        );
      }
    }
}