import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { InMemoryDataService } from './in-memory-data.service';

@NgModule({
  declarations: [AppComponent, TodoListComponent, EditTodoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
