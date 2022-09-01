import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Country } from 'src/app/common/models/country.model';
import { CommonService } from 'src/app/common/services/common.service';
import { EditAddressFormComponent } from '../edit-address-form/edit-address-form.component';
import { EditAddressComponent } from '../edit-address/edit-address.component';
import { AddressFilter } from '../filters/address-filter.model';
import { AddressData } from '../models/address-data.model';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-address-dashboard',
  templateUrl: './address-dashboard.component.html',
  styleUrls: ['./address-dashboard.component.scss'],
})
export class AddressDashboardComponent implements OnInit {
  public addressFilter: AddressFilter = new AddressFilter();
  public countries: Country[];

  public dataSource: MatTableDataSource<AddressData> =
    new MatTableDataSource<AddressData>();
  displayedColumns: string[] = [
    'country',
    'city',
    'street',
    'streetNumber',
    'postalCode',
    'delete',
    'edit',
    'register',
  ];
  addressData: any;
  length: number;
  isLoadingResults: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private addressService: AddressService,
    private commonService: CommonService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.addressService.GetAddresses().subscribe((u) => {
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
        (this.addressFilter.country === '' ||
          a.countryName.includes(this.addressFilter.country)) &&
        (this.addressFilter.postCode === '' ||
          a.postalCode.includes(this.addressFilter.postCode))
    );
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilters(): void {
    this.addressFilter = new AddressFilter();
    this.addressService.GetAddresses().subscribe((a) => {
      this.isLoadingResults = true;
      this.dataSource = new MatTableDataSource(a);
      this.length = this.dataSource.data.length;
      this.isLoadingResults = false;
    });
  }

  deleteUser(id: string): void {
    this.addressService.DeleteAddress(id).subscribe();
    window.location.reload();
  }

  editAddress(id: string): void {
    var address = this.dataSource.data.filter((u) => u.id === id)[0];

    const dialogRef = this.dialog.open(EditAddressFormComponent, {
      width: '350px',
      data: {
        id: address.id,
        city: address.city,
        street: address.street,
        countryId: address.countryId,
        streetNumber: address.streetNumber,
        postalCode: address.postalCode,
      },
    });
    dialogRef.afterClosed().subscribe((r) => {
      this.addressService.GetAddresses().subscribe((u) => {
        this.isLoadingResults = true;
        this.dataSource = new MatTableDataSource(u);
        this.length = this.dataSource.data.length;
        this.isLoadingResults = false;
      });
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  registerAddress(): void {
    const dialogRef = this.dialog.open(EditAddressComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((r) => {
      this.addressService.GetAddresses().subscribe((u) => {
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
