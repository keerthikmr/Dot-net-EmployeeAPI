import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmpAddFormComponent } from './emp-add-form/emp-add-form.component';
import { EmpDisplayComponent } from './emp-display/emp-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EmpDisplayComponent, RouterOutlet, FormsModule, CommonModule, EmpAddFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularApp';
  
}
