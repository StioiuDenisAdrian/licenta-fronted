import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectAddressModel } from 'src/app/addresses/models/select-address.model';
import { AddressService } from 'src/app/addresses/services/address.service';
import { CustomerModel } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
})
export class EditCustomerComponent implements OnInit {
  public addressSelectModels: SelectAddressModel[] = [];
  public hasErrors: boolean = false;

  constructor(
    private readonly addressService: AddressService,
    private readonly customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public customerModel: CustomerModel,
    public dialogRef: MatDialogRef<CustomerModel>
  ) {}

  ngOnInit(): void {
    this.addressService.GetSelectAddressModels().subscribe((c) => {
      this.addressSelectModels = c;
    });
  }

  register() {
    this.customerService.saveCustomer(this.customerModel).subscribe(
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
