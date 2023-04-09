/*=============================================
=        Product Filter object =
=============================================*/
/**
 * Object manage the filtering of product
 */

import Taxonomy from "./Taxonomy";
/**
 * Product Filter object
 * Manage the filtering of product list
 */
class FilterProduct{

    private SEPARATOR_LIST_ITEM : string = "!"
    private sort : string | null;
    private limit : number | null;
    private page : number | null;
    private postIn : string[] | null;
    private taxonomiesList : Taxonomy[] | null;
    

    constructor(){
        this.sort = null;
        this.page = 1;
        this.limit= -1;
        this.postIn= null;
        this.taxonomiesList = null;

        
    }
    public addItemInTaxinomieFilter(taxonomyKey : string, taxonomyValue : number ){
   
      if(this.taxonomiesList){
        let taxonomiIsAdded : boolean = false;
    
        this.taxonomiesList = this.taxonomiesList.map(taxonomy => {
          if(taxonomy.getTaxonomyKey() === taxonomyKey){
            taxonomy.addValue(taxonomyKey, taxonomyValue);
            taxonomiIsAdded = true;
            return taxonomy
          }else{
            return taxonomy
          }
        })

        if(!taxonomiIsAdded){
          this.taxonomiesList.push(new Taxonomy(taxonomyKey, [taxonomyValue]));
        }
      }else{
        this.taxonomiesList = [new Taxonomy(taxonomyKey, [taxonomyValue])]
      }
    }
    public removeTaxonomy(taxonomyKey : string) {
      let listTmp : Taxonomy[] = []
      if(this.taxonomiesList){
        for(let i = 0;  this.taxonomiesList.length > i ; i++){
          if(this.taxonomiesList[i].getTaxonomyKey() !== taxonomyKey){
              listTmp.push(this.taxonomiesList[i]);
          }
        }
      }

      this.taxonomiesList = listTmp
    }
    public removeItemInTaxinomieFilter(taxonomyKey : string, taxonomyValue : number ){

        let listTmp : Taxonomy[] = []
        if(this.taxonomiesList){
          for(let i = 0;  this.taxonomiesList.length > i ; i++){
            if(this.taxonomiesList[i].getTaxonomyKey() === taxonomyKey){
              this.taxonomiesList[i].removeValue(taxonomyKey, taxonomyValue);
            }
            if(!this.taxonomiesList[i].isEmpty()){
              listTmp.push(this.taxonomiesList[i]);
            }
          }
        }

        this.taxonomiesList = listTmp
      }
    
    private convertSortValueStringQuery(keyValue : string, isASC : boolean | null) : string{
      switch(isASC){
        case true:
          return keyValue;
        case false:
          return '-'+keyValue;
        case null:
          return ''
        default:
          return '';
      }
    }
    public setSortFilter(key : string, isASC : boolean | null){
      const convertedValue : string = this.convertSortValueStringQuery(key, isASC);
      this.sort = convertedValue;
    }
    public getQueryString(){

      let queryStringResult : string = "?";
      if (this.taxonomiesList && this.taxonomiesList.length > 0) {
        queryStringResult =
          queryStringResult +
          (queryStringResult === "?" ? "" : "&") +
          "taxinomy=" +this.taxonomiesList.reduce((acc: string, taxonomy, index) => {
            acc = acc +(index > 0 ? "!" : "")+ taxonomy.getQueryString()
            return acc;
          }, "")
          ;
      }
    
      if (this.sort && this.sort !== "") {
        queryStringResult =
          queryStringResult +
          (queryStringResult === "?" ? "" : "&") +
          "sort=" +this.sort;
      }
    
      if (this.limit) {
        queryStringResult =
          queryStringResult +
          (queryStringResult === "?" ? "" : "&") +
          "limit=" +
          this.limit;
      }
    
      if (this.page) {
        queryStringResult =
          queryStringResult +
          (queryStringResult === "?" ? "" : "&") +
          "page=" +
          this.page;
      }

      if (this.postIn && this.postIn.length > 0) {
        queryStringResult =
          queryStringResult +
          (queryStringResult === "?" ? "" : "&") +
          "postin=" +
          this.postIn.reduce((acc, curr, index) => {
            acc += (index > 0 ? "," : "") + curr;
            return acc;
          });
      }
      return queryStringResult === "?" ? "" : queryStringResult;
    }

    public setLimit(limit: number): void{
      this.limit = limit;
    }
  
    public getLimit(): number | null{
      return this.limit;
    }

    public setPage(page: number): void{
      this.page = page;
    }

    public getPage(): number | null {
      return this.page;
    }
    public getTaxonomiesList() : Taxonomy[] | null{
      return this.taxonomiesList;
    }

    public isValueIncludeInTaxonomy(taxonomyKey : string, value : number){
      if(this.taxonomiesList){
        for (let i = 0; this.taxonomiesList.length > i ; i++){
          if (this.taxonomiesList[i].isValueInclude(taxonomyKey, value)){
            return true;
          }
        }
      }
        return false;
     

    }
}




export default FilterProduct;