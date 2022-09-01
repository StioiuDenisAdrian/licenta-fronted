import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { ProductFilter } from '../filters/product.filter';
import { ProductData } from '../models/product-data.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss'],
})
export class ProductDashboardComponent implements OnInit {
  public productFilter: ProductFilter = new ProductFilter();

  public dataSource: MatTableDataSource<ProductData> =
    new MatTableDataSource<ProductData>();
  displayedColumns: string[] = [
    'name',
    'productConventionName',
    'description',
    'material',
    'edit',
    'register',
  ];
  customerData: any;
  length: number;
  isLoadingResults: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((u) => {
      this.isLoadingResults = true;
      this.dataSource = new MatTableDataSource(u);
      this.length = this.dataSource.data.length;
      this.isLoadingResults = false;
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilters(): void {
    this.dataSource.data = this.dataSource.data.filter(
      (a) =>
        (this.productFilter.name === '' ||
          a.name.includes(this.productFilter.name)) &&
        (this.productFilter.description === '' ||
          a.description.includes(this.productFilter.description)) &&
        (this.productFilter.conventionName === '' ||
          a.productConventionName.includes(this.productFilter.description))
    );
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilters(): void {
    this.productFilter = new ProductFilter();
    this.productService.getProducts().subscribe((a) => {
      this.isLoadingResults = true;
      this.dataSource = new MatTableDataSource(a);
      this.length = this.dataSource.data.length;
      this.isLoadingResults = false;
    });
  }

  delete(id: string): void {
    this.productService.deleteProduct(id).subscribe();
    window.location.reload();
  }

  edit(id: string): void {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '350px',
      data: {
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe((r) => {
      this.productService.getProducts().subscribe((u) => {
        this.isLoadingResults = true;
        this.dataSource = new MatTableDataSource(u);
        this.length = this.dataSource.data.length;
        this.isLoadingResults = false;
      });
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  register(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((r) => {
      this.productService.getProducts().subscribe((u) => {
        this.isLoadingResults = true;
        this.dataSource = new MatTableDataSource(u);
        this.length = this.dataSource.data.length;
        this.isLoadingResults = false;
      });
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
