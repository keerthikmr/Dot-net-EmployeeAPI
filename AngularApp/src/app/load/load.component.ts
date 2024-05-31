import { Component } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Input } from '@angular/core';

@Component({
  selector: 'app-load',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './load.component.html',
  styleUrl: './load.component.css'
})
export class LoadComponent {
  // @Input()
  // diameter: number = 1000;
}
