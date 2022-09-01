export class AddressModel{
    id: string;
    countryId: string;
    city: string;
    street: string;
    streetNumber: string;
    postalCode: string;
    countryName: string | undefined;

    public constructor(init?: Partial<AddressModel>) {
        Object.assign(this, init);
      }
}