import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddOrderComponent } from '../add-order/add-order.component';
import { EditOrderComponent } from '../edit-order/edit-order.component';
import { OrderFilter } from '../filters/order.filter';
import { OrderData } from '../models/order-data.model';
import { OrderErrorsComponent } from '../order-errors/order-errors.component';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-dashboard',
  templateUrl: './order-dashboard.component.html',
  styleUrls: ['./order-dashboard.component.scss'],
})
export class OrderDashboardComponent implements OnInit {
  public orderFilter: OrderFilter = new OrderFilter();

  public dataSource: MatTableDataSource<OrderData> =
    new MatTableDataSource<OrderData>();
  displayedColumns: string[] = [
    'orderCode',
    'orderState',
    'productCode',
    'customerName',
    'edit',
    'errors',
    'register',
  ];
  customerData: any;
  length: number;
  isLoadingResults: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private orderService: OrderService, public dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((u) => {
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
        (this.orderFilter.orderCode === '' ||
          a.orderCode.includes(this.orderFilter.orderCode)) &&
        (this.orderFilter.productName === '' ||
          a.productName.includes(this.orderFilter.productName)) &&
        (this.orderFilter.customerName === '' ||
          a.orderCode.includes(this.orderFilter.orderCode)) &&
        (this.orderFilter.orderState === '' ||
          a.productName.includes(this.orderFilter.productName))
    );
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilters(): void {
    this.orderFilter = new OrderFilter();
    this.orderService.getOrders().subscribe((a) => {
      this.isLoadingResults = true;
      this.dataSource = new MatTableDataSource(a);
      this.length = this.dataSource.data.length;
      this.isLoadingResults = false;
    });
  }

  edit(id: string): void {
    const dialogRef = this.dialog.open(EditOrderComponent, {
      width: '350px',
      data: {
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe((r) => {
      this.orderService.getOrders().subscribe((u) => {
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
    const dialogRef = this.dialog.open(AddOrderComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((r) => {
      this.orderService.getOrders().subscribe((u) => {
        this.isLoadingResults = true;
        this.dataSource = new MatTableDataSource(u);
        this.length = this.dataSource.data.length;
        this.isLoadingResults = false;
      });
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  displayErrors(id: string, errors: string){

    const dialogRef = this.dialog.open(OrderErrorsComponent, {
      width: '350px',
      data: {
        errors: errors,
      },
    });
  }
}
