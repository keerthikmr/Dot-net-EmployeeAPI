import { Component } from '@angular/core';
import { PopupService } from '../popup/popup.service';
import { Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-department-detail',
  standalone: true,
  imports: [NgFor, MatButton],
  templateUrl: './department-detail.component.html',
  styleUrl: './department-detail.component.css'
})

export class DepartmentDetailComponent {
  @Input()
  dept_no: number = 0; dept_name: string = '';

  dept_titles: any = [];

  constructor (private http: HttpClient, private PopupService: PopupService) {}

  ngOnInit() {
    this.http.get(`http://localhost:8000/get_dept_titles/${this.dept_no}`).subscribe(data => {
      this.dept_titles = data;
      console.log(data);
    }, (error) => {
      console.error(error);
    });
  }

  closePopup() {
    this.PopupService.closePopup();
  }
}
