import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpDetailComponent } from '../emp-detail/emp-detail.component';

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
}