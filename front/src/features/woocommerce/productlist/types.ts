/*=============================================
=            PRODUCT LIST TYPES          =
=============================================*/

import { ReactNode } from "react";

import FilterProduct from "./model/product/filterProductList/FilterProduct";

import { IProductJSON } from "../types";

export interface OptionMatrix {
  [keyOption: string]: {
    [valueOption: string]: boolean;
  };
}
export interface BtnProps {
  label: string;
  checked: boolean;
  handleClick: any;
}

export interface WrapperProps {
  children: ReactNode;
}

export interface ISortPayload {
  key: string;
  isASC: boolean | null;
}

export interface ICategoryJSON {
  term_id: number;
  name: string;
  taxonomy: string;
  parent: number;
  have_childs: boolean;
  parent_name: null | string,
  thumbnail: {
    url: false | string,
    alt: false | string
  }
  description: string;
}

export interface FilterContainerProps {
  categoryJSON: ICategoryJSON;
}

export interface IcategorieDataJSON {
  categorie_flat: ICategoryJSON[];
}

export interface ProductCategorieFilterContainerProps {
  categorieData: IcategorieDataJSON;
}

export interface ListProductWrapperViewProps {
  children: ReactNode;
}

export interface BtnOptionProps {
  checked: boolean;
  available: boolean;
  label: string;
  handleClick: any;
}

export interface BtnAvailbleStatusProps extends BtnProps {
  available: boolean;
}

export type ProductCardSizeTypes = 'small' | 'medium' | 'large' | 'medium small' | 'large large';
export interface ProductCardProps {
  title: string;
  link: string;
  price: number | string;
  imageGallery: {url: string|null|false, alt: string}[] | null;
  isOnSale: boolean;
  isInStock: boolean;
  regularPrice: number | string;
  cardSize: ProductCardSizeTypes;
  label: string;
  listThumbnailAlt: false | null | {url: string|null|false, alt: string}[]
}

export interface IProductListStore {
  filter: FilterProduct;
  is_show_filter_btn: boolean,
  is_loading: boolean;
  productList: IProductJSON[];
  product_categories_data: IcategorieDataJSON;
  product_categories_selected: {
    nameParent: string;
    parentId: number | null;
    listCategoriesSelected:ICategoryJSON[]
  }
  idCategoryOrigin: number | string;

    currentPage: number | null,
    maxPage: number | null,
    category_page_info:ICategoryJSON

}

export interface IImageJSON {
  //ID: number;
  id?: number;
  //title : string;
  //filesize: number;
  url: string | null | false;
  // link: string;
  alt: string;

  // width: number;
  //height: number;
}

export interface IActionReducer {
  type: string;
  payload: any;
}
