import { IImageJSON, IProductJSON, IProductVariant, IVariationNameDisplay } from "../types";



export interface ICartStore {
    listItems:  IProductCart[];
    itemsStockErrorMatrix: ItemsStockErrorMatrix;
    isLoading : boolean;
    listItemsValidated: IProductCart[] | null;
    isShowModal: boolean,
  }
  
  export interface IAddRemovetoCartPayload {
    product: IProductJSON | IProductVariant;
    quantity: number;
  }

  export interface IProductCart{
    product: IProductJSON | IProductVariant;
    quantity: number;
  }


/*=============================================
=            COMMPONENT PROPS            =
=============================================*/

export interface IProductCartCardProps {
  title: string;
  image: IImageJSON | null,
  link: string,
  quantity:number,
  price: number | string,
  regularPrice: number | string | null,
  onSale: boolean
  messageError: string | null,
  handleClickDelete: any,
  handleClickMoreQuantity: any,
  handleClickLessQuantity: any,
  showMoreBtn: boolean,
  showLessBtn: boolean,
  isReadOnly: boolean,
  removeLabel: string,
  quantityLabel: string,
  variationNameList: IVariationNameDisplay[] |null|false
}

/*=====  End of COMMPONENT PROPS  ======*/


/*=============================================
=            BODY RESPONSE INTERFACE            =
=============================================*/

export interface IItemslineStockStatus {
  
    id: number,
    title: string,
    in_stock: boolean,
    stock_quantity:  number,
    available: boolean,
    code_error: number, // 20 : quantity tow >;  or 10 no stock

}

export interface ItemsStockErrorMatrix{[id: string]:IItemslineStockStatus}

export interface IProductStockSatusBody{
  all_in_stock: boolean;
  items_no_stock:ItemsStockErrorMatrix
}


/*=====  End of BODY RESPONSE INTERFACE  ======*/

