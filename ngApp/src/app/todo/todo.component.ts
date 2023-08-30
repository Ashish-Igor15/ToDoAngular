import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
   title= "ToDo List with Angular" ;
   list: any[]=[];
  todo= [];

  addTask(item: String){
     this.list.push({id:this.list.length,name:item});
     console.warn(this.list)
  }

  removeTask(id:number){
    console.warn(id)
    this.list=this.list.filter(item=>item.id!==id)
  }
  constructor(private _todoService : TodoService) {}

  ngOnInit(){

  }
}
