import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Task } from '../../models/task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  tasks: any[] = [];
  newTask: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.todoService.getTasks().subscribe(data => this.tasks = data);
  }

  addTask() {
    if (this.newTask.trim()) {
      this.todoService.addTask(this.newTask).subscribe(task => {
        this.tasks.push(task);
        this.newTask = ''; 
      });
    }
  }

  toggleComplete(task: Task) {
    this.todoService.toggleTaskCompletion(task._id!).subscribe(updatedTask => {
      task.completed = updatedTask.completed;
    });
  }

  removeTask(id: string) {
    this.todoService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task._id !== id);
    });
  }
}
