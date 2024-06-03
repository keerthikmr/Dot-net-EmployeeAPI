import { Routes } from '@angular/router';
import { EmpDisplayComponent } from './emp-display/emp-display.component';
import { EmpAddFormComponent } from './emp-add-form/emp-add-form.component';
import { SalaryDisplayComponent } from './salary-display/salary-display.component';
import { DepartmentDisplayComponent } from './department-display/department-display.component';
import { DepartmentAddComponent } from './department-add/department-add.component';
import { TitleAddComponent } from './title-add/title-add.component';
import { TitleDisplayComponent } from './title-display/title-display.component';

export const routes: Routes = [
    { path: '', component: EmpDisplayComponent },
    { path: 'employees', component: EmpDisplayComponent },
    { path: 'employees/add', component: EmpAddFormComponent },
    { path: 'departments', component: DepartmentDisplayComponent },
    { path: 'departments/add', component: DepartmentAddComponent },
    { path: 'titles/add', component: TitleAddComponent },
    { path: 'titles', component: TitleDisplayComponent}
];
