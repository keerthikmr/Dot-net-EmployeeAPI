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
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-emp-display',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatListModule, MatButtonModule, EmpDetailComponent, MatIconModule, MatSortModule, MatTableModule],
  templateUrl: './emp-display.component.html',
  styleUrl: './emp-display.component.css',
  host: {ngSkipHydration: 'true'},
})
export class EmpDisplayComponent {
  API_URL = 'http://localhost:8000';

  @ViewChild(MatSort) sort!: MatSort;

  employees: any = [];
  new_employee: any = {};
  sortedData: any;

  displayedColumns = ['emp_no', 'full_name', 'gender', 'age', 'position', 'salary', 'details', 'delete']
  dataSource = new MatTableDataSource(this.employees);

  constructor(private http: HttpClient, private router: Router, private popupService: PopupService) {
    this.sortedData = this.employees.slice();
  }

  ngOnInit() {
    this.http.get(this.API_URL + '/get_all_employees').subscribe(data => {
      this.employees = data;
      
      this.dataSource.data = this.employees;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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
}
