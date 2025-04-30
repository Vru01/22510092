import { Component } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-main',
  imports: [TodoComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  
}
