import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConventionModel } from '../models/convention.model';
import { ConventionService } from '../services/convention.service';

@Component({
  selector: 'app-edit-convention',
  templateUrl: './edit-convention.component.html',
  styleUrls: ['./edit-convention.component.scss'],
})
export class EditConventionComponent implements OnInit {
  public hasErrors: boolean = false;
  public conventionModel: ConventionModel = new ConventionModel();

  constructor(
    private readonly conventionService: ConventionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<string>
  ) {}

  ngOnInit(): void {
    this.conventionService.getConvention(this.data.id).subscribe((u) => {
      this.conventionModel = u;
    })
  }

  register() {
    this.conventionService.saveConvention(this.conventionModel).subscribe(
      () => {this.dialogRef.close();},
      (err) => {
        this.hasErrors = true;
      }
    );
    
  }

  close(): void {
    this.dialogRef.close();
  }
}
