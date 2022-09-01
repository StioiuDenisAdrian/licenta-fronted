export class ProductModel{
    id: string;
    productConventionId: string;
    conventionName: string;
    daysToDeliver: number;
    description: string;
    weight: number;
    material: string;
    name: string;

    public constructor(init?: Partial<ProductModel>) {
        Object.assign(this, init);
      }
}