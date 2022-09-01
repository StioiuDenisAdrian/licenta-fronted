import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Country } from 'src/app/common/models/country.model';
import { CommonService } from 'src/app/common/services/common.service';
import { AddressModel } from '../models/address.model';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss'],
})
export class EditAddressComponent implements OnInit {
  public addressModel: AddressModel = new AddressModel();
  public countries: Country[] = [];

  constructor(
    private readonly addressService: AddressService,
    private readonly commonService: CommonService,
    public dialogRef: MatDialogRef<AddressModel>
  ) {}

  ngOnInit(): void {
    this.commonService.getCountries().subscribe((c) => {
      this.countries = c;
    });
  }

  register() {
    this.addressService.saveAddress(this.addressModel).subscribe(() => {});
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
