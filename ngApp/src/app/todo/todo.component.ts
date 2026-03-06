import { Component, OnInit } from '@angular/core';
import { TodoItem, TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  title = 'ToDo List with Angular';
  list: TodoItem[] = [];
  errorMessage = '';
  newTask = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodo().subscribe({
      next: (todos) => {
        this.list = todos;
      },
      error: () => {
        this.errorMessage = 'Unable to load tasks from server. You can still add local tasks.';
      },
    });
  }

  addTask(): void {
    const taskName = this.newTask.trim();
    if (!taskName) {
      return;
    }

    const nextId = this.list.length ? Math.max(...this.list.map((task) => task.id)) + 1 : 1;
    this.list = [...this.list, { id: nextId, name: taskName }];
    this.newTask = '';
  }

  removeTask(id: number): void {
    this.list = this.list.filter((item) => item.id !== id);
  }

  trackByTodoId(_index: number, item: TodoItem): number {
    return item.id;
  }
}
