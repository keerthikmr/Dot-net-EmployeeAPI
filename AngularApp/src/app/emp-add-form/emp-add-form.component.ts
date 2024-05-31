import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatDatepickerModule } from  '@angular/material/datepicker'; 
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-add-form',
  standalone: true,
  imports: [MatButtonModule, CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatDatepickerModule, MatSelectModule, MatNativeDateModule, MatInputModule],
  templateUrl: './emp-add-form.component.html',
  styleUrl: './emp-add-form.component.css'
})
export class EmpAddFormComponent implements OnInit {
  
  titles: any = [];

  userForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private http: HttpClient, private dateAdapter: DateAdapter<Date>, private router: Router) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      birth_date: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      title: ['', Validators.required],
      hired_date: ['', Validators.required]
    });
    
    this.http.get('http://localhost:8000' + '/get_all_titles').subscribe(data => {
      this.titles = data;
    });
  }

  formattedDate(ogDate: Date) {
    const result = ogDate.toLocaleDateString("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    console.log(result);
    return result;
  }

  onSubmit(form: FormGroup ) {
    console.log(form)
    if (form.valid) {
      const formData = new FormData();
      formData.append('first_name', form.value.first_name);
      formData.append('last_name', form.value.last_name);
      formData.append('gender', form.value.gender);
      formData.append('title', form.value.title);
      formData.append('birth_date', this.formattedDate(form.value.birth_date));
      formData.append('hired_date', this.formattedDate(form.value.hired_date));

      this.http.post('http://localhost:8000/add_employee', formData).subscribe((response) => {
          console.log(response);
          this.router.navigate(['/employees']);
        }, (error) => {
          console.error(error);
        });
    }
  }
}