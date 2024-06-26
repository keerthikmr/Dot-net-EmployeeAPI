import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmpAddFormComponent } from './emp-add-form/emp-add-form.component';
import { EmpDisplayComponent } from './emp-display/emp-display.component';
import { HeaderComponent } from './header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EmpDisplayComponent, HeaderComponent, RouterOutlet, FormsModule, CommonModule, EmpAddFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // constructor(private router: Router, private empDisplayComp: EmpDisplayComponent) {
  //   this.router.events.subscribe((e) => {
  //     if (e instanceof EmpDisplayComponent) {
  //         console.log("navigated")
  //         empDisplayComp.ngOnInit();
  //     }
  //   });
  // }
}
