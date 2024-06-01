import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';

@Component({
  selector: 'app-title-edit-form',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, NgFor, MatSelectModule],
  templateUrl: './title-edit-form.component.html',
  styleUrl: './title-edit-form.component.css'
})
export class TitleEditFormComponent {
  title: any = {};
  depts: any = [];

  constructor(private fb: FormBuilder, private http: HttpClient){}

  userForm: FormGroup = new FormGroup({});

  @Input()
  id: number = 0;

  ngOnInit() {
    this.userForm = this.fb.group({
      birth_date: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      title: ['', Validators.required],
      hired_date: ['', Validators.required]
    });
    
    this.http.get('http://localhost:8000' + '/get_all_dept').subscribe(data => {
      this.depts = data;
    });

    this.http.get('http://localhost:8000' + `/get_title/${this.id}`).subscribe(data => {
      
      // data[0] isn't accesiible, so assign it to a variable
      this.title = data;
      this.title = this.title[0];
      
      // Preset the employee values in the form
      this.userForm.controls['title_id'].setValue(this.title.title_id)
      this.userForm.controls['title_name'].setValue(this.title.title_name)
      this.userForm.controls['base_salary'].setValue(this.title.base_salary)
      this.userForm.controls['dept_no'].setValue(this.title.dept_no)
    });

  }

  titleDelete(title_id: number){

  }

  onSubmit(form: FormGroup){

  }
}
