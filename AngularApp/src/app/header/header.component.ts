import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatIcon, NgIf, MatButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  profile: any = {};
  profileShown: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  viewProfile() {

    if (this.profileShown) {
      this.closeProfile();
    } else {
      this.showProfile();
    }
  }

  showProfile() {  
    this.http.get('http://localhost:8000/api/Auth/get_logged_user').subscribe(data => {
    
      this.profile = data;
      console.log(this.profile);
    });
    this.profileShown = true;
  }

  closeProfile() {
    this.profileShown = false;
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.closeProfile();
    this.router.navigate(['/login']);
  }
}