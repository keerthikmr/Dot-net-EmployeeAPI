import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-emp-display',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './emp-display.component.html',
  styleUrl: './emp-display.component.css'
})
export class EmpDisplayComponent {
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
