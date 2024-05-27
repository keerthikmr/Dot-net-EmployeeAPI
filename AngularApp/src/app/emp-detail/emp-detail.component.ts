import { Component } from '@angular/core';
import { PopupService } from '../popup/popup.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-emp-detail',
  standalone: true,
  imports: [],
  templateUrl: './emp-detail.component.html',
  styleUrl: './emp-detail.component.css'
})
export class EmpDetailComponent {

  @Input()
  id: number = 0;
  
  constructor(private PopupService: PopupService) {}
  
  closePopup() {
    this.PopupService.closePopup();
    console.log(this.id);
  }
}
