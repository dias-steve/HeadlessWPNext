/*=============================================
=            SHIPPMENT METHODE CLASS          =
=============================================*/
/**
 *
 * Shipping method are host in the Zone Shippement object
 * With zone location object
 *
 * A shipping methode is a shipping way available in the woocommerce shop
 */
class ShippingMethod {
  // type of the method as rateflat
  private methodTitle: string;

  // this is the unique id of the methode as reatflate:8
  private methodRateId: string;

  // the title show to the user
  private methodUserTitle: string;
  private methodCost: number;

  private methodDescription: string | null;
  private freeShipping: boolean;
  private minAmount: number;
  private isEnbled: boolean;

  constructor(
    methodTitle: string,
    methodUserTitle: string,
    methodRateId: string,
    methodCost: number
  ) {
    this.methodTitle = methodTitle;
    this.methodRateId = methodRateId;
    this.methodCost = methodCost;
    this.methodUserTitle = methodUserTitle;
    this.methodDescription = null;
    this.freeShipping = false;
    this.minAmount = 0;
    this.isEnbled = false;
  }

  public isIsEnbled(): boolean {
    return this.isEnbled;
  }

  public setIsEnbled(isEnbled: boolean): void {
    this.isEnbled = isEnbled;
  }

  public getMinAmount(): number {
    return this.minAmount;
  }

  public setMinAmount(minAmount: number): void {
    this.minAmount = minAmount;
  }

  public isFreeShipping(): boolean {
    return this.freeShipping;
  }

  public setFreeShipping(freeShipping: boolean): void {
    this.freeShipping = freeShipping;
  }

  public getMethodTitle(): string {
    return this.methodTitle;
  }

  public setMethodTitle(methodTitle: string): void {
    this.methodTitle = methodTitle;
  }

  public getId(): string {
    return this.methodRateId;
  }

  public setId(methodRateId: string): void {
    this.methodRateId = methodRateId;
  }

  public getMethodUserTitle(): string {
    return this.methodUserTitle;
  }

  public setMethodUserTitle(methodUserTitle: string): void {
    this.methodUserTitle = methodUserTitle;
  }

  public getMethodCost(): number {
    return this.methodCost;
  }

  public setMethodCost(methodCost: number): void {
    this.methodCost = methodCost;
  }

  public getMethodDescription(): string | null {
    return this.methodDescription;
  }

  public setMethodDescription(methodDescription: string): void {
    this.methodDescription = methodDescription;
  }

  public isEqual(shippingMethod: ShippingMethod): boolean {
    return (
      this.methodTitle === shippingMethod.getMethodTitle() &&
      this.methodRateId === shippingMethod.getId() &&
      this.methodUserTitle === shippingMethod.getMethodUserTitle()
    );
  }
}

export default ShippingMethod;
