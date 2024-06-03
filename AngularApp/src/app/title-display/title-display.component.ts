import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { PopupService } from '../popup/popup.service';

@Component({
  selector: 'app-title-display',
  standalone: true,
  imports: [NgFor, MatIconModule, MatButtonModule],
  templateUrl: './title-display.component.html',
  styleUrl: './title-display.component.css'
})
export class TitleDisplayComponent {

  titles: any = [];
  depts: any = [];

  constructor (private router: Router, private http: HttpClient, private popup: PopupService) {}
  
  ngOnInit(){
    this.getTitles();
    this.getDepts();
  }
  
  getTitles() {
    this.http.get('http://localhost:8000' + '/get_all_titles').subscribe(data => {
      this.titles = data;
    });
  }

  getDepts() {
    this.http.get('http://localhost:8000' + '/get_all_dept').subscribe(data => {
      this.depts = data;
    });
  }

  getDeptName(dept_no: number) { // Change logic
    let i: number;
    for (i=0; i< this.depts.length; i++){
      if (this.depts[i].dept_no == dept_no) {
        return this.depts[i].dept_name;
      }
    }
  }

  goToPage(url : string) {
    this.router.navigate([url]);
  }

  openDelete(title_id: number){
    this.popup.openDeleteConfPopup(title_id, 'title');
  }

  openEdit(title_id: number){
    this.popup.openTitleEditPopup(title_id);
  }
}
