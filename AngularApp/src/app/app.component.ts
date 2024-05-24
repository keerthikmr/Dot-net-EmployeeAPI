import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularApp';
  API_URL = 'http://localhost:8000';

  employees: any = [];
  new_employee: any = {};

  constructor(private http: HttpClient) {}

  onSubmit(form: NgForm ) {
    if (form.valid) {
      const formData = new FormData();
      formData.append('first_name', form.value.firstName);
      formData.append('last_name', form.value.lastName);
      formData.append('birth_date', form.value.birthDate);
      formData.append('gender', form.value.gender);
      formData.append('hired_date', form.value.hiredDate);
  
      this.http.post('http://localhost:8000/add_employee', formData).subscribe((response) => {
          console.log(response);
          form.reset();
        }, (error) => {
          console.error(error);
        });
    }
  }

  
  ngOnInit() {
    this.getEmployees();
  }

  // onSubmit(form: NgForm) {
  //   console.log('Form data:', form.value.hiredDate);
  //   this.http.post(this.API_URL + '/add_employee', form.value).subscribe(data => {
  //     console.log('Data:', data);
  //     this.getEmployees();
  //   });
  // }

  getEmployees() {
    this.http.get(this.API_URL + '/get_all_employees').subscribe(data => {
      this.employees = data;
    });
  }

  // onSubmit(form: NgForm) {
  //   const body = `
  //     ?first_name=${this.new_employee.first_name}&
  //     last_name=${this.new_employee.last_name}&
  //     gender=${this.new_employee.birth_date}&
  //     birth_date=${this.new_employee.hired_date}&
  //     hired_date=${this.new_employee.gender}
  //   `;
  //   console.log(body);
  //   // ?last_name=last&birth_date=2000-10-02&gender=Female&hired_date=2024-03-01'

  //   this.http.post(this.API_URL + '/add_employee', body).subscribe(data => {
  //     console.log('Data:', data);
  //     this.getEmployees();
  //   });
  // }

}
