import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private _todoUrl = "http://localhost:3000/api/todo" ;
  constructor(private http: HttpClient) { }

  getTodo(){
    return this.http.get<any>(this._todoUrl);
  }
}

