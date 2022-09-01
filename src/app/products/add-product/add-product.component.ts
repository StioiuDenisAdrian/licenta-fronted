import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ConventionSelect } from 'src/app/convention/models/convention-select.model';
import { ConventionModel } from 'src/app/convention/models/convention.model';
import { ConventionService } from 'src/app/convention/services/convention.service';
import { ProductModel } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  public productModel: ProductModel = new ProductModel();
  public hasErrors: boolean = false;
  public conventions: ConventionSelect[];

  constructor(
    private readonly conventionService: ConventionService,
    private readonly productService: ProductService,
    public dialogRef: MatDialogRef<ConventionModel>
  ) {}

  ngOnInit(): void {
    this.conventionService.getSelectConventionModel().subscribe(c =>{
      this.conventions = c;
    })
  }

  register() {
    this.productService.saveProduct(this.productModel).subscribe(() => {this.dialogRef.close();},
    (err) => {this.hasErrors = true});
    
  }

  close(): void {
    this.dialogRef.close();
  }


}
