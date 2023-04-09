/*=============================================
=           ZONE LOCATION CLASS          =
=============================================*/
/**
 * Host the code location as FR OR AF
 * and the type as 'continent' or 'country'
 * It be used in the Zone shippinment object
 * To determine which zone are available the methode shipping 
 * in the zone shippement object
 */

import { ZoneLocationType } from "../types";

class ZoneLocation {
    private code : string;
    private type : ZoneLocationType;

    constructor(code : string, type : ZoneLocationType){
        this.code = code;
        this.type = type;
    }

    public getCode(): string {
        return this.code;
    }

    public setCode(code: string): void {
        this.code = code;
    }

    public getType(): ZoneLocationType {
        return this.type;
    }

    public setType(type: ZoneLocationType): void {
        this.type = type;
    }

    public isEqual(zoneLocation: ZoneLocation): boolean {
        return this.type === zoneLocation.type && this.code === zoneLocation.code
    }
}

export default ZoneLocation;