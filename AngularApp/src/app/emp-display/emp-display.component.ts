import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { PopupService } from '../popup/popup.service';

@Component({
  selector: 'app-emp-display',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatListModule, MatButtonModule],
  templateUrl: './emp-display.component.html',
  styleUrl: './emp-display.component.css'
})
export class EmpDisplayComponent {
  API_URL = 'http://localhost:8000';

  employees: any = [];
  new_employee: any = {};

  constructor(private http: HttpClient, private router: Router, private popupService: PopupService) {}

  openPopup() {
    this.popupService.openPopup();
  }
  
  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.http.get(this.API_URL + '/get_all_employees').subscribe(data => {
      this.employees = data;
    });
  }

  info(id: number){
    console.log(id);
  }

  goToPage(url : string) {
    this.router.navigate([url]);
  }
}
