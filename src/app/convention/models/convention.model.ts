export class ConventionModel {
  id: string;
  conventionName: string;
  conventionDescription: string;
  isAdr: boolean;
  isHalal: boolean;
  isKosher: boolean;
  isInflamable: boolean;
  tunnelCode: string;
  packingGroup: string;
  taricCode: string;
  nationalCode: string;
  commodityCode: string;

  public constructor(init?: Partial<ConventionModel>) {
    Object.assign(this, init);
  }
}
