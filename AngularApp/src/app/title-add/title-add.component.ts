import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-title-add',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './title-add.component.html',
  styleUrl: './title-add.component.css'
})
export class TitleAddComponent {
  userForm: FormGroup = new FormGroup({});
  
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,  private dateAdapter: DateAdapter<Date>){
    this.dateAdapter.setLocale('en-GB');
  }
  
  ngOnInit(){
    this.userForm = this.fb.group({
      dept_no: ['', Validators.required],
      title_name: ['', Validators.required],
      base_salary: ['', Validators.required]
    });
  }

  formattedDate(ogDate: Date) {
    const result = ogDate.toLocaleDateString("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    return result;
  }

  onSubmit(form: FormGroup){
    if (form.valid) {
      const formData = new FormData();
      
      formData.append('title_name', form.value.title_name);
      formData.append('dept_no', form.value.dept_no);
      formData.append('base_salary', form.value.base_salary);

      this.http.post('http://localhost:8000/add_title', formData).subscribe((response) => {
          console.log(response);
          this.router.navigate(['/titles']);
        }, (error) => {
          console.error(error);
        });
    }
  }
}
