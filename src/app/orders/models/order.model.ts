export class OrderModel {
  id: string;
  customerId: string;
  customerName: string;
  pickupAddressId: string;
  deliveryAddressId: string;
  productId: string;
  productName: string;
  orderStateId: number;
  orderStateName: string;
  deliveryDate: string;
  eoriCode: string;
  orderCode: string;
  orderDescription: string;

  public constructor(init?: Partial<OrderModel>) {
    Object.assign(this, init);
  }
}
