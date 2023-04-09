/*=============================================
=            SHIPPMENT MANAGER CLASS          =
=============================================*/

import { getContinentCodeOfCountry } from "../utils/getContinentCodeFromCounrtryCode";

// OTHER CLASS
import ShippingMethod from "./ShippingMethod";
import ZoneLocation from "./ZoneLocation";
import ZoneShippment from "./ZoneShippment";

/**
 * SHIPPMENT MANAGER CLASS
 *
 * Manage the Zone Location and Shipping Methods
 * fron woocommerce
 */
class ShippementManager {
  /**
   * zonShippimentList
   * Host the ZoneShippiment : {ShippingMethode}
   */
  private zoneShippementList: ZoneShippment[];

  constructor() {
    this.zoneShippementList = [];
  }

  public getZoneShippementList(): ZoneShippment[] {
    return this.zoneShippementList;
  }

  public setZoneShippementList(zoneShippementList: ZoneShippment[]): void {
    this.zoneShippementList = zoneShippementList;
  }

  /**
   * Get Shipping Methode By ZoneLocation and Total Price Cart
   *
   * It return juste the ShippingMethode available for the cournt selected
   * and the amout price requierded by the Shipping Methode is
   * less than the total price of the cart
   *
   * @param zoneLocation objet wich encapsulate a list of courntry Code or continent Code that represents the Zone
   * @param totalPriceCart number of the total price
   * @returns list of ShippingMethode available for the coutry Code and total Price
   */
  public getShippementMethodListByZoneLocationAndTotalPriceCart(
    zoneLocation: ZoneLocation,
    totalPriceCart: number
  ): ShippingMethod[] {
    let shippingMethodsAvailableList: ShippingMethod[] = [];
    this.zoneShippementList.forEach((zoneShippementIn) => {
      if (zoneShippementIn.isIncludeInZoneLocationList(zoneLocation)) {
        shippingMethodsAvailableList =
          zoneShippementIn.getShippmentMethodAvailableWithCartTotalPrice(
            totalPriceCart
          );
      }
    });
    return shippingMethodsAvailableList;
  }

  /**
   * Get ShippingMethode For other country
   *
   * Return the shipping method for other country whose not found a ZoneLocation
   * @param totalPriceCart : the total price of the cart
   * @returns : list shipping methode available for other country and total price
   */
  public getShippingMethodeForEverywhere(
    totalPriceCart: number
  ): ShippingMethod[] {
    let shippingMethodsAvailableList: ShippingMethod[] = [];
    this.zoneShippementList.forEach((zoneShippementIn) => {
      if (zoneShippementIn.isForEverywhere()) {
        shippingMethodsAvailableList =
          zoneShippementIn.getShippmentMethodAvailableWithCartTotalPrice(
            totalPriceCart
          );
      }
    });

    return shippingMethodsAvailableList;
  }
  /**
   * Get Shippiment MethodList By Country code
   *
   * It return juste the ShippingMethode available for the cournt selected
   * and the amout price requierded by the Shipping Methode is
   * less than the total price of the cart
   *
   * @param countryCode : courtry code as FR CH ...
   * @param totalPriceCart : total price of the cart
   * @returns list of methode avaible with the counrtry code and total price of the cart
   */
  public getShippementMethodListByCountryCode(
    countryCode: string,
    totalPriceCart: number
  ): ShippingMethod[] {
    //Creation of zone location to compare
    const zoneLocationCountry: ZoneLocation = new ZoneLocation(
      countryCode,
      "country"
    );
    // initial shipping method found
    let shippingMethodsAvailable: ShippingMethod[] = [];

    /*==========1/3 FIND SHIPPING METHODE FOR THE COURNTRY - BEGIN  ===============*/
    shippingMethodsAvailable =
      this.getShippementMethodListByZoneLocationAndTotalPriceCart(
        zoneLocationCountry,
        totalPriceCart
      );
    /*==========1/3 FIND SHIPPING METHODE FOR THE COURNTRY - END  ===============*/

    /*==========2/3 FIND SHIPPING METHODE FOR THE CONTINENT - BEGIN  ===============*/
    /**
     * if we don't found any shipping method with the country code
     * we try the continent code of the country
     */
    if (shippingMethodsAvailable.length <= 0) {
      const continentCodeOfCountry: string | null =
        getContinentCodeOfCountry(countryCode);

      if (continentCodeOfCountry) {
        const zoneLocationContinent: ZoneLocation = new ZoneLocation(
          continentCodeOfCountry,
          "continent"
        );
        shippingMethodsAvailable =
          this.getShippementMethodListByZoneLocationAndTotalPriceCart(
            zoneLocationContinent,
            totalPriceCart
          );
      }
    }

    /*==========2/3 FIND SHIPPING METHODE FOR THE CONTINENT - END ===============*/

    /*==========3/3 FIND SHIPPING METHODE FOR THE OTHER CONTRY - BEGIN  ===============*/
    /**
     * if we don't found any shipping method with the country code
     * and whit conitment code too, then
     * we try to find a methode shipping for all countries eles
     */
    if (shippingMethodsAvailable.length <= 0) {
      shippingMethodsAvailable =
        this.getShippingMethodeForEverywhere(totalPriceCart);
    }

    /*==========3/3 FIND SHIPPING METHODE FOR THE OTHER CONTRY - END  ===============*/
    return shippingMethodsAvailable;
  }
}

export default ShippementManager;
