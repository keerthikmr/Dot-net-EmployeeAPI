import { Component } from '@angular/core';
import { PopupService } from '../popup/popup.service';
import { Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { Injectable } from '@angular/core';
import { EmpDisplayComponent } from '../emp-display/emp-display.component';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-emp-detail',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './emp-detail.component.html',
  styleUrl: './emp-detail.component.css'
})
export class EmpDetailComponent {
  API_URL = 'http://localhost:8000';
  employee: any = {};

  @Input()
  id: number = 0;
  
  constructor(private http: HttpClient, private PopupService: PopupService, private empDisplayComp: EmpDisplayComponent) {}

  ngOnInit() {
    this.http.get(this.API_URL + `/get_employee/${this.id}`).subscribe(data => {
      
      this.employee = data;
      this.employee = this.employee[0];
    });
  }
  
  sliceFunction(data:any){
    return data.slice(0,10);
  }
  
  closePopup() {
    this.PopupService.closePopup();
  }

  editEmp(){
    this.PopupService.openEditPopup(this.id);
  }

  getAge(){
    return this.empDisplayComp.getAge(this.employee.birth_date);
  }
}
