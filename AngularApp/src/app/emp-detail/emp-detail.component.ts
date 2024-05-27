import { Component } from '@angular/core';
import { PopupService } from '../popup/popup.service';

@Component({
  selector: 'app-emp-detail',
  standalone: true,
  imports: [],
  templateUrl: './emp-detail.component.html',
  styleUrl: './emp-detail.component.css'
})
export class EmpDetailComponent {

  constructor(private PopupService: PopupService) {}
  
  closePopup() {
    this.PopupService.closePopup();
  }
}
