import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ConventionModel } from '../models/convention.model';
import { ConventionService } from '../services/convention.service';

@Component({
  selector: 'app-add-convention',
  templateUrl: './add-convention.component.html',
  styleUrls: ['./add-convention.component.scss']
})
export class AddConventionComponent implements OnInit {

  public conventionModel: ConventionModel = new ConventionModel();
  public hasErrors: boolean = false;

  constructor(
    private readonly conventionService: ConventionService,
    public dialogRef: MatDialogRef<ConventionModel>
  ) {}

  ngOnInit(): void {
  }

  register() {
    this.conventionService.saveConvention(this.conventionModel).subscribe(() => {this.dialogRef.close();},
    (err) => {this.hasErrors = true});
    
  }

  close(): void {
    this.dialogRef.close();
  }

}
