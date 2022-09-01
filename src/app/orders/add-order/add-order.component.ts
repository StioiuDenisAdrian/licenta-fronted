import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SelectAddressModel } from 'src/app/addresses/models/select-address.model';
import { AddressService } from 'src/app/addresses/services/address.service';
import { CustomerSelectModel } from 'src/app/customers/models/customer-select.model';
import { CustomerService } from 'src/app/customers/services/customer.service';
import { ProductSelect } from 'src/app/products/models/product-select.model';
import { ProductService } from 'src/app/products/services/product.service';
import { OrderModel } from '../models/order.model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
})
export class AddOrderComponent implements OnInit {
  public customers: CustomerSelectModel[] = [];
  public pickupAddresses: SelectAddressModel[] = [];
  public deliveryAddresses: SelectAddressModel[] = [];
  public products: ProductSelect[] = [];
  public orderModel: OrderModel = new OrderModel();

  public hasErrors: boolean = false;

  constructor(
    private readonly addressService: AddressService,
    private readonly customerService: CustomerService,
    private readonly productService: ProductService,
    private readonly orderService: OrderService,
    public dialogRef: MatDialogRef<OrderModel>
  ) {}

  ngOnInit(): void {
    this.addressService.GetSelectAddressModels().subscribe((c) => {
      this.pickupAddresses = c;
      this.deliveryAddresses = c;
    });

    this.productService.getSelectProductModel().subscribe((p) => {
      this.products = p;
    });

    this.customerService.GetSelectCustomerModels().subscribe((c) => {
      this.customers = c;
    });
  }

  register() {
    this.orderService.saveOrder(this.orderModel).subscribe(
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
