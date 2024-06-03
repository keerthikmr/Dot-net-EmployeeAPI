import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpDetailComponent } from '../emp-detail/emp-detail.component';
import { EmpEditFormComponent } from '../emp-edit-form/emp-edit-form.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { TitleEditFormComponent } from '../title-edit-form/title-edit-form.component';
import { DepartmentDetailComponent } from '../department-detail/department-detail.component';

@Injectable({
  providedIn: 'root',
})

export class PopupService {
  constructor(private dialog: MatDialog) {}

  openPopup(id: number) {
    const dialogRef = this.dialog.open(EmpDetailComponent, {
      data: { id: id }
    });

    dialogRef.componentInstance.id = id;
  }

  closePopup() {
    this.dialog.closeAll();
  }

  openEditPopup(id: number) {
    this.closePopup();
    const dialogRef = this.dialog.open(EmpEditFormComponent, {
      data: { id: id }
    });

    dialogRef.componentInstance.id = id;
  }

  openTitleEditPopup(id: number) {
    this.closePopup();
    const dialogRef = this.dialog.open(TitleEditFormComponent, {
      data: { id: id }
    });

    dialogRef.componentInstance.id = id;
  }

  openDeleteConfPopup(id: number, opType: string) {
  
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: { id: id, type: opType},
      panelClass: 'small-dialog'
    });

    dialogRef.componentInstance.id = id;
    dialogRef.componentInstance.type = opType;
  }

  openDeptDetail(dept_no: number, dept_name: string) {
    const dialogRef = this.dialog.open(DepartmentDetailComponent, {
      data: { dept_no: dept_no, dept_name: dept_name }
    });

    dialogRef.componentInstance.dept_no = dept_no;
    dialogRef.componentInstance.dept_name = dept_name;
  }
}