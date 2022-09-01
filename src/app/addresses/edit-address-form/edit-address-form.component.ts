import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Country } from 'src/app/common/models/country.model';
import { CommonService } from 'src/app/common/services/common.service';
import { AddressModel } from '../models/address.model';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-edit-address-form',
  templateUrl: './edit-address-form.component.html',
  styleUrls: ['./edit-address-form.component.scss']
})
export class EditAddressFormComponent implements OnInit {

  public countries: Country[] = [];

  constructor(
    private readonly addressService: AddressService,
    private readonly commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public addressModel: AddressModel,
    public dialogRef: MatDialogRef<AddressModel>
  ) {}

  ngOnInit(): void {
    this.commonService.getCountries().subscribe(c =>{
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
