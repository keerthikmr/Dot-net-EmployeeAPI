import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpDetailComponent } from '../emp-detail/emp-detail.component';

@Injectable({
  providedIn: 'root',
})

export class PopupService {
  constructor(private dialog: MatDialog) {}

  openPopup() {
    this.dialog.open(EmpDetailComponent);
  }

  closePopup() {
    this.dialog.closeAll();
  }
}