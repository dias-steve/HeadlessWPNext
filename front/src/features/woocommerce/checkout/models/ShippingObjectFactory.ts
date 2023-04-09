/*=============================================
=            SHIPPMENT OBJECT FACTORY        =
=============================================*/
/**
 * Helper to build the all object shipping
 * 
 * its use when we get the shipping list from the backend 
 * at the checkout page
 */
import {
  IShippingMethodJSON,
  IZoneLocationJSON,
  IZoneShippment,
} from "../types";

//models
import ShippementManager from "./ShippementManager";
import ShippingMethod from "./ShippingMethod";
import ZoneLocation from "./ZoneLocation";
import ZoneLocations from "./ZoneLocation";
import ZoneShippment from "./ZoneShippment";

class ShippingObjectFactory {
  public getShippingMethodFromJSON(
    shippingMethode: IShippingMethodJSON
  ): ShippingMethod | null {


    const cost = shippingMethode.method_cost || 0
    const shippingMethodObject = new ShippingMethod(
      shippingMethode.method_title,
      shippingMethode.method_user_title,
      shippingMethode.method_rate_id,
      Number(cost)
    );

    if(shippingMethode.method_is_enbled){
      shippingMethodObject.setIsEnbled(true);
    }
    if (shippingMethode.method_id === "free_shipping") {
      shippingMethodObject.setFreeShipping(true);
    }

    if(shippingMethode.min_amount){
        shippingMethodObject.setMinAmount(Number(shippingMethode.min_amount))
    }

    if(shippingMethode.method_description){
      shippingMethodObject.setMethodDescription(shippingMethode.method_description)
    }
    return shippingMethodObject;
  }

  public getZoneLocation(
    zoneLocationJson: IZoneLocationJSON
  ): ZoneLocations | null {
    return new ZoneLocations(zoneLocationJson.code, zoneLocationJson.type);
  }

  public getZoneShippement(zoneShippementJson: IZoneShippment): ZoneShippment {
    let zoneLocationList: ZoneLocation[] = [];
    let shippingMethodList: ShippingMethod[] = [];

    if (
      Array.isArray(zoneShippementJson.zone_locations) &&
      zoneShippementJson.zone_locations.length > 0
    ) {
      zoneShippementJson.zone_locations.forEach((zoneLocationJson) => {
        const zoneLocation = this.getZoneLocation(zoneLocationJson);
        if (zoneLocation) {
          zoneLocationList.push(zoneLocation);
        }
      });
    }

    if (
      Array.isArray(zoneShippementJson.zone_shipping_methods) &&
      zoneShippementJson.zone_shipping_methods.length > 0
    ) {
      zoneShippementJson.zone_shipping_methods.forEach((shippingMethodJson) => {
        const shippingMethod =
          this.getShippingMethodFromJSON(shippingMethodJson);
        if (shippingMethod) {
          shippingMethodList.push(shippingMethod);
        }
      });
    }
    const zoneShippment = new ZoneShippment(
      zoneShippementJson.zone_id,
      zoneShippementJson.zone_name,
      zoneShippementJson.zone_formatted_location,
      zoneLocationList,
      shippingMethodList
    );
    return zoneShippment;
  }

  public getShippementManager(zoneShippementListJson: IZoneShippment[]): ShippementManager{
    let zoneShippementList : ZoneShippment[] = [];

    if(Array.isArray(zoneShippementListJson)){
        zoneShippementListJson.forEach(zoneShippementJson => {
            const zoneShippment : ZoneShippment = this.getZoneShippement(zoneShippementJson);
            if(zoneShippment){
                zoneShippementList.push(zoneShippment)
            }
        })
    }

    const shippementManager = new ShippementManager();
    shippementManager.setZoneShippementList(zoneShippementList)
    return shippementManager;
  }
}
export default ShippingObjectFactory;
