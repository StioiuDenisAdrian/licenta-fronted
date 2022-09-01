import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SelectAddressModel } from 'src/app/addresses/models/select-address.model';
import { AddressService } from 'src/app/addresses/services/address.service';
import { CustomerModel } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  public customerModel: CustomerModel = new CustomerModel();
  public addressSelectModels: SelectAddressModel[] =[];
  public hasErrors: boolean = false;

  constructor(
    private readonly addressService: AddressService,
    private readonly customerService: CustomerService,
    public dialogRef: MatDialogRef<CustomerModel>
  ) {}

  ngOnInit(): void {
    this.addressService.GetSelectAddressModels().subscribe((c) => {
      this.addressSelectModels = c;
    });
  }

  register() {
    this.customerService.saveCustomer(this.customerModel).subscribe(() => {this.dialogRef.close();},
    (err) => {this.hasErrors = true});
    
  }

  close(): void {
    this.dialogRef.close();
  }

}
