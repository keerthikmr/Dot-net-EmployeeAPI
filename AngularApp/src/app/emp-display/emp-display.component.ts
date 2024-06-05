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
import { MatInput } from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatFormField } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface Emp {
  age: number;
  full_name: string;
  gender: string;
  title_name: string;
  salary: number,
  first_name: string;
  last_name: string;
  hired_date: Date;
  birth_date: Date;
  emp_no: number;
}

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-emp-display',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatListModule, MatButtonModule, EmpDetailComponent, MatIconModule, MatSortModule, MatTableModule, MatInput, MatExpansionModule, MatFormField, MatSelectModule, FormsModule, FormsModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './emp-display.component.html',
  styleUrl: './emp-display.component.css',
})

export class EmpDisplayComponent {
  API_URL = 'http://localhost:8000';

  @ViewChild(MatSort) sort!: MatSort;

  employees: any = [];
  new_employee: Emp = {age: 0, full_name: '', first_name: '', last_name: '', salary: 0, birth_date: new Date(), hired_date: new Date(), gender: '', emp_no: 0, title_name: ''};
  sortedData: any;

  titles: any = [];
  depts: any = [];

  userForm: FormGroup = new FormGroup({});
  position = '';
  gender = '';
  department = '';
  minAge = 0;
  maxAge = 0;
  minSalary = 0;
  maxSalary = 0;

  displayedColumns = ['emp_no', 'full_name', 'gender', 'age', 'position', 'salary', 'details', 'delete']
  dataSource = new MatTableDataSource(this.employees);

  constructor(private http: HttpClient, private router: Router, private popupService: PopupService, private fb: FormBuilder) {
    this.sortedData = this.employees.slice();
  }

  prepareData() {
    this.employees.forEach((employee: any) => {
      employee.age = this.getAge(employee.birth_date);
      employee.full_name = employee.first_name + ' ' + employee.last_name;
      this.setData();
    });

  }

  setData() {
    this.dataSource.data = this.employees;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      position: ['', Validators.required],
      department: ['', Validators.required],
      gender: ['', Validators.required],
      min_salary: ['', Validators.required],
      max_salary: ['', Validators.required],
      min_age: ['', Validators.required],
      max_age: ['', Validators.required],
    });

    this.http.get(this.API_URL + '/get_all_employees').subscribe(async data => {
      this.employees = data;
      
      this.prepareData(); 
      this.setData();
    });

    this.dataSource.filterPredicate = (data: unknown, filter: string) => this.getFilterPredicate()(data as Emp, filter);

    // this.dataSource.filterPredicate = (data:any, filter) => 
    //   (data.first_name.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
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

  doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  getFilterPredicate() {
    return (data: Emp, filter: string) => {
      const filterArray = filter.split('$');

      const position = filterArray[0];
      const gender = filterArray[1];
      const minAge = filterArray[2];
      const maxAge = filterArray[3];
      const minSalary = filterArray[4];
      const maxSalary = filterArray[5];

      const matchFilter = [];

      const colTitle = data.title_name;
      const colGender = data.gender;
      const colAge = data.age;
      const colSalary = data.salary;

      const filterPosition = colTitle.toLocaleLowerCase().includes(position);
      const filterGender = colGender.toLowerCase().includes(gender);
      const filterAge = colAge >= parseInt(minAge) && colAge <= parseInt(maxAge);
      const filterSalary = colSalary >= parseInt(minSalary) && colSalary <= parseInt(maxSalary);

      matchFilter.push(filterPosition);
      matchFilter.push(filterGender);
      matchFilter.push(filterAge);
      matchFilter.push(filterSalary);

      return matchFilter.every(Boolean);
    };
  }

  applyFilter() {
    const position = this.userForm.get('position')!.value;
    const gender = this.userForm.get('gender')!.value;
    const minAge = this.userForm.get('min_age')!.value;
    const maxAge = this.userForm.get('max_age')!.value;
    const minSalary = this.userForm.get('min_salary')!.value;
    const maxSalary = this.userForm.get('max_salary')!.value;

    this.position = position === null  ? '' : position;
    this.gender = gender === null ? '' : gender;
    this.minAge = (minAge === null || minAge === '') ? 0 : minAge;
    this.maxAge = (maxAge === null || maxAge === '') ? Number.MAX_SAFE_INTEGER : maxAge;
    this.minSalary = (minSalary === null || minSalary === '') ? 0 : minSalary;
    this.maxSalary = (maxSalary === null || maxSalary === '') ? Number.MAX_SAFE_INTEGER : maxSalary;

    const filterValue = this.position + '$' + this.gender + '$' + this.minAge + '$' + this.maxAge + '$' + this.minSalary + '$' + this.maxSalary;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
