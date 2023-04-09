/*=============================================
=            Zone Shippement CLASS          =
=============================================*/
/**
 * The host of the Shipping Mthode and Zone Shippement
 * 
 * it gather Shipping methods avaiable for a list of country and continent( Zone Location)
 *
 */


import ShippingMethod from "./ShippingMethod";
import ZoneLocations from "./ZoneLocation";

class ZoneShippment {
    private id : number;
    private name: string;
    private zoneLocationsList: ZoneLocations [];
    private formatedLocation: string;
    private shippingMethodList: ShippingMethod[];

    constructor(id: number, name: string, formatedLocation: string,zoneLocationsList: ZoneLocations[], shippingMethodList: ShippingMethod[]){
        this.id = id;
        this.name = name;
        this.zoneLocationsList = zoneLocationsList;
        this.shippingMethodList = shippingMethodList;
        this.formatedLocation = formatedLocation;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getZoneLocationsList() : ZoneLocations[] {
        return this.zoneLocationsList;
    }

    public setZoneLocationsList(zoneLocationsList: ZoneLocations[]): void {
        this.zoneLocationsList = zoneLocationsList;
    }

    public getFormatedLocation(): string {
        return this.formatedLocation;
    }

    public setFormatedLocation(formatedLocation: string): void {
        this.formatedLocation = formatedLocation;
    }

    public getShippingMethodList(): ShippingMethod[] {
        return this.shippingMethodList;
    }

    public setShippingMethodList(shippingMethodList: ShippingMethod[]): void {
        this.shippingMethodList = shippingMethodList;
    }

    public isIncludeInZoneLocationList(zoneLocation : ZoneLocations): boolean{
        let isInclude = false;

        this.zoneLocationsList.forEach(zoneLocationIn => {
            if (zoneLocation.isEqual(zoneLocationIn)){
                isInclude= true;
            }
        })
        return isInclude
    }


    /**
     * Get Shippmeent methode Available for a total price cart
     * in this zone shippement
     * 
     * it short the result by cost of shipping method
     * by default the first is the chepest method
     * 
     * the component will select the first shipping method available
     * @param totalPriceCart : the total price of the cart
     * @param DESC : shorting
     * @returns : list of shippinf methode
     */
    public getShippmentMethodAvailableWithCartTotalPrice(totalPriceCart : number, DESC: boolean = false ) : ShippingMethod[]{
        let shippingMethodsAvailable : ShippingMethod[] = []
        this.shippingMethodList.forEach(shippingMethodIn => {
            if(shippingMethodIn.getMinAmount() <= totalPriceCart  && shippingMethodIn.isIsEnbled()){
                shippingMethodsAvailable.push(shippingMethodIn)
            }
        });
        return  this.getSortedShippmentMethod(shippingMethodsAvailable, DESC);
    }

    /**
     * get Sorted Shippment Method
     * 
     * sort the shipping methods list by cost 
     * 
     * @param shippementMethod 
     * @param DESC 
     * @returns 
     */
    public getSortedShippmentMethod( shippementMethod : ShippingMethod[], DESC: boolean){
        let shippingMethodSorted = shippementMethod
        for(let i = 0 ; i < shippingMethodSorted.length-1; i++){
            if(!DESC){
                if(shippingMethodSorted[i+1].getMethodCost() <= shippingMethodSorted[i].getMethodCost() ){
                    let tmp : ShippingMethod = shippingMethodSorted[i];
                    shippingMethodSorted[i] = shippingMethodSorted[i+1];
                    shippingMethodSorted[i+1] = tmp;
                    i= -1;
                 
                }
            }else{
                if(shippingMethodSorted[i].getMethodCost() < shippingMethodSorted[i+1].getMethodCost() ){
                    let tmp : ShippingMethod = shippingMethodSorted[i];
                    shippingMethodSorted[i] = shippingMethodSorted[i+1];
                    shippingMethodSorted[i+1] = tmp;
                    i= -1;
                }
            }
        }

        return shippingMethodSorted
    }
    
    public isForEverywhere(){
        return this.id === 0;
    }

}

export default ZoneShippment;