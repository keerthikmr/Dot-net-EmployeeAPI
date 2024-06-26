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
import { NativeDateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { PopupService } from '../popup/popup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-edit-form',
  standalone: true,
  imports: [MatButtonModule, CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatDatepickerModule, MatSelectModule, MatNativeDateModule, MatInputModule],
  providers: [ {provide: DateAdapter, useClass: NativeDateAdapter}, {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}, ],
  templateUrl: './emp-edit-form.component.html',
  styleUrl: './emp-edit-form.component.css'
})
export class EmpEditFormComponent implements OnInit{
  API_URL = 'http://localhost:8000';
  employee: any = {};
  titles: any = [];

  userForm: FormGroup = new FormGroup({});
  
  constructor(private fb: FormBuilder, private http: HttpClient, private dateAdapter: DateAdapter<Date>, private popup: PopupService, private router: Router) {
    this.dateAdapter.setLocale('en-GB');
  }

  @Input()
  id: number = 0;

  ngOnInit() {
    this.userForm = this.fb.group({
      emp_no: ['', Validators.required],
      birth_date: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      hired_date: ['', Validators.required],
      salary: ['', Validators.required],
      title_id: ['', Validators.required]
    });

    this.http.get('http://localhost:8000' + '/get_all_titles').subscribe(data => {
      this.titles = data;
    });

    this.http.get(this.API_URL + `/get_employee/${this.id}`).subscribe(data => {
      
      // data[0] isn't accesiible, so assign it to a variable
      this.employee = data;
      this.employee = this.employee[0];
      
      // Preset the employee values in the form
      this.userForm.controls['emp_no'].setValue(this.employee.emp_no)
      this.userForm.controls['gender'].setValue(this.employee.gender)
      this.userForm.controls['first_name'].setValue(this.employee.first_name)
      this.userForm.controls['last_name'].setValue(this.employee.last_name)
      this.userForm.controls['birth_date'].setValue(this.employee.birth_date)
      this.userForm.controls['hired_date'].setValue(this.employee.hired_date)
      this.userForm.controls['title_id'].setValue(this.employee.title_id) // preset doesn't work. *Fix*
      this.userForm.controls['salary'].setValue(this.employee.salary)
    });
    
  }

  formattedDate(ogDate: Date) {
    if (typeof(ogDate) == 'string') {
      return ogDate;
    }
    const result = ogDate.toLocaleDateString("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    return result;
  }

  // To reload the same page (reflect changes)
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri])});
  }

  onSubmit(form: FormGroup ) {
    console.log(form);
    if (form.valid) {
      const formData = new FormData();

      formData.append('emp_no', form.value.emp_no);
      formData.append('first_name', form.value.first_name);
      formData.append('last_name', form.value.last_name);
      formData.append('gender', form.value.gender);
      formData.append('birth_date', this.formattedDate(form.value.birth_date));
      formData.append('hired_date', this.formattedDate(form.value.hired_date));
      formData.append('title_id', form.value.title_id);
      formData.append('salary', form.value.salary);

      this.http.post('http://localhost:8000/edit_employee', formData).subscribe((response) => {
          console.log(response);
          this.popup.closePopup();
          this.redirectTo('/employees');
        }, (error) => {
          console.error(error);
        });
    }
  }

  empDelete(id: number){
    this.popup.openDeleteConfPopup(id, 'employee');        
  }
}
