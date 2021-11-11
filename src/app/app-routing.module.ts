import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';

const routes: Routes = [
  { path: 'todos', component: TodoListComponent ,
    children: [
      {
        path: ':id',
        component: EditTodoComponent,
      },
    ],
  },
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
