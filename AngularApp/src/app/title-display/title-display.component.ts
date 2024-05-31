import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-title-display',
  standalone: true,
  imports: [NgFor, MatIconModule, MatButtonModule],
  templateUrl: './title-display.component.html',
  styleUrl: './title-display.component.css'
})
export class TitleDisplayComponent {

  titles: any = [];

  constructor (private router: Router, private http: HttpClient) {}
  
  ngOnInit(){
    this.getTitles();
  }
  
  getTitles() {
    this.http.get('http://localhost:8000' + '/get_all_titles').subscribe(data => {
      this.titles = data;
    });
  }

  goToPage(url : string) {
    this.router.navigate([url]);
  }

  openDetail(emp_no: number){

  }
}
