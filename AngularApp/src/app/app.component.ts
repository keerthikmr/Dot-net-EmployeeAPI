import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EmpAddFormComponent } from './emp-add-form/emp-add-form.component';
import { EmpDisplayComponent } from './emp-display/emp-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EmpDisplayComponent, RouterOutlet, FormsModule, HttpClientModule, CommonModule, EmpAddFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularApp';
  API_URL = 'http://localhost:8000';

  employees: any = [];
  new_employee: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.http.get(this.API_URL + '/get_all_employees').subscribe(data => {
      this.employees = data;
    });
  }
}
