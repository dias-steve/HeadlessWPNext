/*=============================================
=        Product Taxonomy =
=============================================*/

/**
 * Taxonomy manager
 */
export default class Taxonomy {

    private SEPARATOR : string = ",";
    private taxonomyKey : string;
    private valueList :number[];

    constructor(taxonomyKey:string, valueList: number[] ){
        this.taxonomyKey = taxonomyKey;
        this.valueList = valueList;
    }

    public getTaxonomyKey(): string {
        return this.taxonomyKey;
    }

    public setTaxonomyKey(taxonomyKey: string): void {
        this.taxonomyKey = taxonomyKey;
    }

    public getValueList(): number[] {
        return this.valueList;
    }

    public setValueList(valueList: number[]): void {
        this.valueList = valueList;
    }

    public addValue(taxonomyKey: string, value:  number): void {
        if(taxonomyKey === this.taxonomyKey) {
            this.valueList.push(value)
        }
    };

    public removeValue(taxonomyKey: string, value : number): void{
        if(taxonomyKey === this.taxonomyKey) {
            this.valueList = this.valueList.filter(item => Number(item) !== Number(value))
    
        }
    }

    public isEmpty() : boolean{
        if(this.valueList.length <= 0){
            return true
        }else{
            return false
        }
    }
    public getQueryString() : string{

        if(this.valueList.length <= 0){
            return "";
        }
        const queryItem =
        this.taxonomyKey +
        "=" +
        this.valueList.reduce((acc2, currentValue, currentIndex) => {
          acc2 += (currentIndex > 0 ? this.SEPARATOR : "") + currentValue;
          return acc2;
        }, "");

        return queryItem;
    }

    public isValueInclude(taxonomyKey: string, value : number) : boolean {
        if (taxonomyKey === this.taxonomyKey){
            return this.valueList.includes(value);
        }else{
            return false;
        }
  
    }
}