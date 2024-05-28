import { Component, OnInit, Input } from '@angular/core';
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

@Component({
  selector: 'app-emp-edit-form',
  standalone: true,
  imports: [MatButtonModule, FormsModule, CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatDatepickerModule, MatSelectModule, MatNativeDateModule, MatInputModule],
  templateUrl: './emp-edit-form.component.html',
  styleUrl: './emp-edit-form.component.css'
})
export class EmpEditFormComponent {
  userForm: FormGroup = new FormGroup({});
  
  constructor(private fb: FormBuilder, private http: HttpClient, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB');
  }

  @Input()
  id: number = 0;

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

    if (form.valid) {
      console.log(form.value.birth_date);
      const formData = new FormData();
      formData.append('first_name', form.value.first_name);
      formData.append('last_name', form.value.last_name);
      formData.append('gender', form.value.gender);
      formData.append('birth_date', this.formattedDate(form.value.birth_date));
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
