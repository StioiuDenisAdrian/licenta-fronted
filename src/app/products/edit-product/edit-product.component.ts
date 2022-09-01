import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConventionSelect } from 'src/app/convention/models/convention-select.model';
import { ConventionService } from 'src/app/convention/services/convention.service';
import { ProductModel } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  public hasErrors: boolean = false;
  public productModel: ProductModel = new ProductModel();
  public conventions: ConventionSelect[];

  constructor(
    private readonly conventionService: ConventionService,
    private readonly productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<string>
  ) {}

  ngOnInit(): void {
    this.conventionService.getConventions().subscribe((u) => {
      this.conventions = u;
    });
    this.productService.getProduct(this.data.id).subscribe((u) => {
      this.productModel = u;
    });
  }

  register() {
    this.productService.saveProduct(this.productModel).subscribe(
      () => {
        this.dialogRef.close();
      },
      (err) => {
        this.hasErrors = true;
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }
}
