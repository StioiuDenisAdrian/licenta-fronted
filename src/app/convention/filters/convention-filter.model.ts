export class ConventionFilter {
  name: string;
  description: string;

  public constructor(init?: Partial<ConventionFilter>) {
    Object.assign(this, init);
  }
}
