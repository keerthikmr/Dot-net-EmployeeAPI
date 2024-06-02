import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { PopupService } from '../popup/popup.service';

@Component({
  selector: 'app-title-display',
  standalone: true,
  imports: [NgFor, MatIconModule, MatButtonModule],
  templateUrl: './department-display.component.html',
  styleUrl: './department-display.component.css'
})
export class DepartmentDisplayComponent {

  departments: any = [];

  constructor (private router: Router, private http: HttpClient, private popup: PopupService) {}
  
  ngOnInit(){
    this.getDepartments();
  }
  
  getDepartments() {
    this.http.get('http://localhost:8000' + '/get_all_dept').subscribe(data => {
      this.departments = data;
    });
  }

  goToPage(url : string) {
    this.router.navigate([url]);
  }

  openDelete(title_id: number){
    this.popup.openDeleteConfPopup(title_id, 'department');
  }

  openDetail(dept_no: number) {

  }
}
