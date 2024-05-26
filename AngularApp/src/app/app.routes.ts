import { Routes } from '@angular/router';
import { EmpDisplayComponent } from './emp-display/emp-display.component';
import { EmpAddFormComponent } from './emp-add-form/emp-add-form.component';
import { SalaryDisplayComponent } from './salary-display/salary-display.component';
import { DepartmentDisplayComponent } from './department-display/department-display.component';
import { DepartmentAddComponent } from './department-add/department-add.component';

export const routes: Routes = [
    { path: 'employees', component: EmpDisplayComponent },
    { path: 'employees/add', component: EmpAddFormComponent },
    { path: 'salaries', component: SalaryDisplayComponent },
    { path: 'departments', component: DepartmentDisplayComponent },
    { path: 'departments/add', component: DepartmentAddComponent },
];
