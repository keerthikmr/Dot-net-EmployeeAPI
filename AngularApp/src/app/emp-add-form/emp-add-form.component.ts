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


@Component({
  selector: 'app-emp-add-form',
  standalone: true,
  imports: [MatButtonModule, FormsModule, CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatDatepickerModule, MatSelectModule, MatNativeDateModule, MatInputModule],
  templateUrl: './emp-add-form.component.html',
  styleUrl: './emp-add-form.component.css'
})
export class EmpAddFormComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      birth_date: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      hired_date: ['', Validators.required]
    });
  }

  formattedDate(ogDate: Date) {
    const date = ogDate.getDate();
    const month = ogDate.getMonth();
    const year = ogDate.getFullYear();
    return `${year}-${month}-${date}`;
  }

  onSubmit(form: FormGroup ) {
    console.log(form.value.birth_date);
    if (form.valid) {
      console.log('works submit');
      const formData = new FormData();
      formData.append('first_name', form.value.first_name);
      formData.append('last_name', form.value.last_name);
      formData.append('birth_date', this.formattedDate(form.value.birth_date));
      formData.append('gender', form.value.gender);
      formData.append('hired_date', this.formattedDate(form.value.hired_date));
  
      this.http.post('http://localhost:8000/add_employee', formData).subscribe((response) => {
          console.log(response);
          form.reset();
        }, (error) => {
          console.error(error);
        });
    }
  }
}