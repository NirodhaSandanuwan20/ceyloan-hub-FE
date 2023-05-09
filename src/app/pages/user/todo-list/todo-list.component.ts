import {Component, OnInit} from '@angular/core';
import {Todo} from './Todo';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: string;

  constructor(
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getTodo();
  }

  getTodo(){
    let retString = localStorage.getItem('todos');
    this.todos = JSON.parse(retString);
  }
  saveTodo(){
    if(this.newTodo){
      let todo = new Todo();
      todo.name = this.newTodo;
      todo.isCompleted = true;
      this.todos.push(todo);
      console.log(this.todos);
      let array = JSON.stringify(this.todos);
      console.log(array);
      localStorage.setItem('todos', array);
      this.newTodo = '';
    }else {
      this.snack.open('Empty task description ', 'error', {
        duration: 3000,
        horizontalPosition:'center',
        verticalPosition:'top'
      });
    }
  }

  done(id: number){
    this.todos[id].isCompleted = !this.todos[id].isCompleted;
    let array = JSON.stringify(this.todos);
    localStorage.setItem('todos', array);
  }

  remove(id:number){
    this.todos = this.todos.filter((v,i) => i !== id);
    let array = JSON.stringify(this.todos);
    localStorage.setItem('todos', array);
  }

}
