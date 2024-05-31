import { Routes } from '@angular/router';
import { EmpDisplayComponent } from './emp-display/emp-display.component';
import { EmpAddFormComponent } from './emp-add-form/emp-add-form.component';
import { SalaryDisplayComponent } from './salary-display/salary-display.component';
import { DepartmentDisplayComponent } from './department-display/department-display.component';
import { DepartmentAddComponent } from './department-add/department-add.component';
import { LoadComponent } from './load/load.component';

export const routes: Routes = [
    { path: '', component: EmpDisplayComponent },
    { path: 'employees', component: EmpDisplayComponent },
    { path: 'employees/add', component: EmpAddFormComponent },
    { path: 'salaries', component: SalaryDisplayComponent },
    { path: 'departments', component: DepartmentDisplayComponent },
    { path: 'departments/add', component: DepartmentAddComponent },
    { path: 'load', component: LoadComponent}
];
