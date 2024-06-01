import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogClose } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  standalone: true,
  imports: [MatDialogClose, MatButtonModule],
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.css'
})
export class ConfirmDeleteComponent {
  @Input() id: number = 0;
  @Input() type: string = '';

  constructor (private http: HttpClient, private router: Router, private dialog: MatDialog){}

  API_URL = 'http://localhost:8000';

  // To reload the same page (reflect changes)
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri])});
  }

  confirmDel(){
    let suffix = '';

    console.log(this.type);
    if (this.type == 'employee'){
      suffix = '/delete_employee/';
    } else {
      suffix = '/delete_title/';
    }
    this.http.post(this.API_URL + suffix, this.id).subscribe(data => {
      console.log(data);
      this.redirectTo(this.type + 's');
    });
    this.dialog.closeAll();  
  }
}
