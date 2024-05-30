import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpDetailComponent } from '../emp-detail/emp-detail.component';
import { EmpEditFormComponent } from '../emp-edit-form/emp-edit-form.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

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

  openDeleteConfPopup(id: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: { id: id },
      panelClass: 'small-dialog'
    });

    dialogRef.componentInstance.id = id;
  }
}