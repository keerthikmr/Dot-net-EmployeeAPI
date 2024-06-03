import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { PopupService } from '../popup/popup.service';
import { EmpDetailComponent } from '../emp-detail/emp-detail.component';
import { Injectable } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { Sort, MatSortModule } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-emp-display',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatListModule, MatButtonModule, EmpDetailComponent, MatIconModule, MatSortModule],
  templateUrl: './emp-display.component.html',
  styleUrl: './emp-display.component.css',
  host: {ngSkipHydration: 'true'},
})
export class EmpDisplayComponent {
  API_URL = 'http://localhost:8000';

  employees: any = [];
  new_employee: any = {};
  sortedData: any;

  constructor(private http: HttpClient, private router: Router, private popupService: PopupService) {
    this.sortedData = this.employees.slice();
  }

  ngOnInit() {
    this.getEmployees();
  }

  ngAfterViewInit() {
    this.sortData({active: 'emp_id', direction: 'asc'});
  }

  getEmployees() {
    this.http.get(this.API_URL + '/get_all_employees').subscribe(data => {
      this.employees = data;
    });
  }
  
  getAge(birthDate: string) {
    const today = new Date();
    let age = today.getFullYear() - Number(birthDate.slice(0, 4));

    const monthDiff = today.getMonth() - Number(birthDate.slice(5,7));
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < Number(birthDate.slice(8, 10)))) {
      age--;
    }
    return age;
  }

  openDetail(id: number) {
    this.popupService.openPopup(id);
  }

  goToPage(url : string) {
    this.router.navigate([url]);
  }

  deleteEmp(id: number){
    this.popupService.openDeleteConfPopup(id, 'employee');
  }

  sortData(sort: Sort) {
    const data = this.employees.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        
        case 'emp_id':
          return compare(a.emp_no, b.emp_no, isAsc);
        case 'age':
          return compare(a.birth_date, b.birth_date, isAsc);
        case 'gender':
            return compare(a.gender, b.gender, isAsc);
        case 'salary':
          return compare(a.salary, b.salary, isAsc);
        case 'name':
          return compare(a.first_name, b.first_name, isAsc);
        default:
          return 0;
      }
    });
  }

}
  function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
