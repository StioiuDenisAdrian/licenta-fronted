import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-errors',
  templateUrl: './order-errors.component.html',
  styleUrls: ['./order-errors.component.scss']
})
export class OrderErrorsComponent implements OnInit {
public errors: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<string>) { }

  ngOnInit(): void {
    this.errors = this.data.errors;
  }

  close(): void {
    this.dialogRef.close();
  }

}
