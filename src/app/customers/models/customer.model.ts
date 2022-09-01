export class CustomerModel {
  id: string;
  addressId: string;
  name: string;
  phoneNumber: string;
  email: string;
  description: string;
  public constructor(init?: Partial<CustomerModel>) {
    Object.assign(this, init);
  }
}
