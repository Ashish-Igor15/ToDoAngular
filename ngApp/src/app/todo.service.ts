import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TodoItem {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly todoUrl = 'http://localhost:3000/api/todo';

  constructor(private http: HttpClient) {}

  getTodo(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.todoUrl);
  }
}
