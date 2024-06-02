import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-title-add',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './department-add.component.html',
  styleUrl: './department-add.component.css'
})

export class DepartmentAddComponent {
  userForm: FormGroup = new FormGroup({});
  
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router){}
  
  ngOnInit(){
    this.userForm = this.fb.group({
      dept_name: ['', Validators.required],
    });
  }

  onSubmit(form: FormGroup){
    if (form.valid) {
      const formData = new FormData();

      formData.append('dept', form.value.dept_name);

      this.http.post('http://localhost:8000/add_dept', formData).subscribe((response) => {
          console.log(response);
          this.router.navigate(['/departments']);
        }, (error) => {
          console.error(error);
        });
    }
  }
}
