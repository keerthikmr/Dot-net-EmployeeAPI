import { Component } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { JwtAuth } from '../models/jwtAuth';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [MatInput, MatButton, MatCardModule, MatFormField, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  loginDto = new Login();
  registerDto = new Register();
  jwtDto = new JwtAuth();



  constructor(private authService: AuthenticationService, private fb: FormBuilder, private http: HttpClient, private router: Router){}

  register(registerDto: Register) {
    this.authService.register(registerDto).subscribe();
  }
  
  login(loginDto: Login) {
    this.authService.login(loginDto).subscribe((jwtDto) => {
      localStorage.setItem('jwtToken', this.jwtDto.token);
    });
  }

  userForm: FormGroup = new FormGroup({});

  credentials : any
  ngOnInit() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email : ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  loginSubmit(form: FormGroup) {

    if (form.valid) {
      const formData = new FormData();

      formData.append('username', form.value.username);
      formData.append('password', form.value.password);

      this.http.get('http://localhost:8000' + '/authenticate').subscribe(data => {
        this.credentials = data;
        console.log(this.credentials);
        
        this.credentials.forEach((credential: any) => {
          if (credential.username === form.value.username && credential.password === form.value.password) {
            this.router.navigate(['/employees']);
          }
        });
      });
    }
  }
}
