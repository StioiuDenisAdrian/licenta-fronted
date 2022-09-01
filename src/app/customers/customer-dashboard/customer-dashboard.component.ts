import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddressService } from 'src/app/addresses/services/address.service';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { CustomerData } from '../models/customer-data.model';
import { CustomerFilter } from '../models/customer-filter.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit {

  public customerFilter: CustomerFilter = new CustomerFilter();

  public dataSource: MatTableDataSource<CustomerData> =
    new MatTableDataSource<CustomerData>();
  displayedColumns: string[] = [
    'name', 'email', 'phoneNumber', 'delete','edit','register'
  ];
  customerData: any;
  length: number;
  isLoadingResults: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private addressService: AddressService,
    private customerService: CustomerService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.customerService.GetCustomers().subscribe((u) => {
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
        (this.customerFilter.name === '' ||
          a.name.includes(this.customerFilter.name)) &&
        (this.customerFilter.email === '' ||
          a.email.includes(this.customerFilter.email))
    );
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilters(): void {
    this.customerFilter = new CustomerFilter();
    this.customerService.GetCustomers().subscribe((a) => {
      this.isLoadingResults = true;
      this.dataSource = new MatTableDataSource(a);
      this.length = this.dataSource.data.length;
      this.isLoadingResults = false;
    });
  }

  deleteCustomer(id: string): void {
    this.customerService.DeleteCustomer(id).subscribe();
    window.location.reload();
  }

  editCustomer(id: string): void {
    var customer = this.dataSource.data.filter((u) => u.id === id)[0];

    const dialogRef = this.dialog.open(EditCustomerComponent, {
      width: '350px',
      data: {
        id: customer.id,
        addressId: customer.addressId,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        description: customer.description,
        name: customer.name
      },
    });
    dialogRef.afterClosed().subscribe((r) => {
      this.customerService.GetCustomers().subscribe((u) => {
        this.isLoadingResults = true;
        this.dataSource = new MatTableDataSource(u);
        this.length = this.dataSource.data.length;
        this.isLoadingResults = false;
      });
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  registerCustomer(): void {
    const dialogRef = this.dialog.open(AddCustomerComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((r) => {
      this.customerService.GetCustomers().subscribe((u) => {
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
