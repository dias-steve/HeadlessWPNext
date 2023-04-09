/*=============================================
=            PRODUCT LIST REDUCER            =
=============================================*/

//types
import { IProductJSON } from "../../types";
import {
  ISortPayload,
  IActionReducer,
  IProductListStore,
  OptionMatrix,
  IcategorieDataJSON,
  ICategoryJSON,
} from "../types";

//Model
import FilterProduct from "../model/product/filterProductList/FilterProduct";

/*=============================================
=            PRODUCT LIST TYPES            =
=============================================*/
export const productListTypes = {
  SET_FILTER: "SET_FILTER",
  SET_PRODUCT_LIST: "SET_PRODUCT_LIST",
  SET_IS_LOADING: "SET_IS_LOADING",
  SET_PAGINATION: "SET_PAGINATION",
  ADD_CATEGORY_FILTER: "ADD_CATEGORY_FILTER",
  REMOVE_CATEGORY_FILTER: "REMOVE_CATEGORY_FILTER",
  SET_SORT_FILTER: "SET_SORT_FILTER",
  FETCH_PRODUCT_LIST_START: "FETCH_PRODUCT_LIST_START",
  SET_FILTER_START: "SET_FILTER_START",
  SET_PRODUCT_LIST_V2: "SET_PRODUCT_LIST_V2",
  SET_CATEGORIES_DATA: "SET_CATEGORIES_DATA",
  SET_CATEGORIES_SELECTED: "SET_CATEGORIES_SELECTED",
  SET_CATEGORIES_PARENT_BACK: "SET_CATEGORIES_BACK",
  SET_Id_CATEGORY_ORIGIN: "SET_Id_CATEGORY_ORIGIN",
  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
  SET_MAX_PAGE: "SET_PAGE_MAX",
  SET_CURRENT_PAGE_START: "SET_CURRENT_PAGE_START",
  SET_NEXT_PAGE_START: "SET_NEXT_PAGE_START",
  SET_PREV_PAGE_START: "SET_PREV_PAGE_START",
  SET_RESET_STATE: "SET_RESET_STATE",
  SET_CATEGORY_PAGE_INFO: "SET_CATEGORY_PAGE_INFO",
  SET_IS_SHOW_FILTER_BTN: "SET_IS_SHOW_FILTER_BTN",
};

/*=====  End of TYPES  ======*/

/*=============================================
=            PRODUCT LIST INITIAL STATE          =
=============================================*/
export const INITIAL_STATE: IProductListStore = {
  filter: new FilterProduct(),

  is_show_filter_btn: true,
  is_loading: false,
  //TO DO
  /*pagination: {
    current_page: 1,
    page_nb_max: 1,
    nb_product_found: 1,
  }*/
  //list of product found
  productList: [],
  product_categories_data: {
    categorie_flat: [],
  },
  product_categories_selected: {
    nameParent: "FR=Tout|EN=All",
    parentId: 0,
    listCategoriesSelected: [],
  },

  idCategoryOrigin: 0,
  //PAGINATION
  currentPage: 1,
  maxPage: null,
  category_page_info: {
    term_id: 0,
    name: "",
    taxonomy: "-1",
    parent: -1,
    have_childs: false,
    parent_name: null,
    thumbnail: {
      url: false,
      alt: false,
    },
    description: "",
  },
};

/*=====  End of INNITIAL STATE  ======*/

/*=============================================
=            ACTIONS            =
=============================================*/
export const setIsShowFilterBtn = (isShow: boolean) => ({
  type: productListTypes.SET_IS_SHOW_FILTER_BTN,
  payload: isShow,
});

export const setCategoryPageInfoAction = (category: ICategoryJSON) => ({
  type: productListTypes.SET_CATEGORY_PAGE_INFO,
  payload: category,
});

export const resetStateAction = () => ({
  type: productListTypes.SET_RESET_STATE,
});
export const setNextPageStart = () => ({
  type: productListTypes.SET_NEXT_PAGE_START,
});

export const setPrevPageStart = () => ({
  type: productListTypes.SET_PREV_PAGE_START,
});

export const setCurrentPageStart = (nbPage: number) => ({
  type: productListTypes.SET_CURRENT_PAGE_START,
  payload: nbPage,
});
export const setCurrentPage = (currentPage: number) => ({
  type: productListTypes.SET_CURRENT_PAGE,
  payload: currentPage,
});

export const setMaxPage = (maxPage: number) => ({
  type: productListTypes.SET_MAX_PAGE,
  payload: maxPage,
});
export const setIdCategoryOriginAction = (id: number | string) => ({
  type: productListTypes.SET_Id_CATEGORY_ORIGIN,
  payload: id,
});

export const setCategoriesParentBackAction = () => ({
  type: productListTypes.SET_CATEGORIES_PARENT_BACK,
});
export const setCategoriesSelectedAction = (categorieData: {
  parentId: number | null;
  listCategoriesSelected: ICategoryJSON[];
  nameParent: string;
}) => ({
  type: productListTypes.SET_CATEGORIES_SELECTED,
  payload: categorieData,
});
export const setCategoriesDataAction = (categoriedata: IcategorieDataJSON) => ({
  type: productListTypes.SET_CATEGORIES_DATA,
  payload: categoriedata,
});
export const setFilter = (filter: FilterProduct) => ({
  type: productListTypes.SET_FILTER,
  payload: filter,
});

export const setProductList = (listProduct: IProductJSON[]) => ({
  type: productListTypes.SET_PRODUCT_LIST,
  payload: listProduct,
});

export const setIsLoading = (isLoading: boolean) => ({
  type: productListTypes.SET_IS_LOADING,
  payload: isLoading,
});

export const setPagination = (paginationData: any) => ({
  type: productListTypes.SET_PAGINATION,
  payload: paginationData,
});

export const addCategoryToFilter = (payload: {
  idCategory: number | string;
  idParent: number | null;
}) => ({
  type: productListTypes.ADD_CATEGORY_FILTER,
  payload: payload,
});

export const removeCategoryToFilter = (idCategory: string | number) => ({
  type: productListTypes.REMOVE_CATEGORY_FILTER,
  payload: idCategory,
});

export const fetchProductListStart = (filter: FilterProduct | null) => ({
  type: productListTypes.FETCH_PRODUCT_LIST_START,
  payload: filter,
});

export const setFilterStartAction = (filter: FilterProduct) => ({
  type: productListTypes.SET_FILTER_START,
  payload: filter,
});

export const setSortFilterAction = (sort: ISortPayload) => ({
  type: productListTypes.SET_SORT_FILTER,
  payload: sort,
});

export const setProductListAction = (productList: IProductJSON[]) => ({
  type: productListTypes.SET_PRODUCT_LIST_V2,
  payload: productList,
});

/*=====  End of ACTIONS  ======*/

/*=============================================
=            PRODUCT LIST REDUCER           =
=============================================*/

const productListReducer = (state = INITIAL_STATE, action: IActionReducer) => {
  switch (action.type) {
    case productListTypes.SET_IS_SHOW_FILTER_BTN:
      return {
        ...state,
        is_show_filter_btn: action.payload
      };
    case productListTypes.SET_RESET_STATE:
      return {
        ...state,
        currentPage: 1,
        idCategoryOrigin: 0,
        filter: new FilterProduct(),
        product_categories_selected: {
          ...state.product_categories_selected,
          nameParent: state.product_categories_selected.nameParent,
          parentId: 0,
        },
        category_page_info: INITIAL_STATE.category_page_info,
      };

    case productListTypes.SET_CATEGORY_PAGE_INFO:
      return {
        ...state,
        category_page_info: action.payload,
      };
    case productListTypes.SET_MAX_PAGE:
      return {
        ...state,
        maxPage: action.payload,
      };

    case productListTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case productListTypes.SET_Id_CATEGORY_ORIGIN:
      return {
        ...state,
        idCategoryOrigin: action.payload,
      };
    case productListTypes.SET_CATEGORIES_SELECTED:
      return {
        ...state,
        product_categories_selected: action.payload,
      };

    case productListTypes.SET_CATEGORIES_DATA:
      return {
        ...state,
        product_categories_data: action.payload,
      };
    case productListTypes.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    case productListTypes.SET_PRODUCT_LIST:
      return {
        ...state,
        product_list: action.payload,
      };

    case productListTypes.SET_IS_LOADING:
      return {
        ...state,
        is_loading: action.payload,
      };

    case productListTypes.SET_PAGINATION:
      return {
        ...state,
        pagination: action.payload,
      };
    case productListTypes.SET_PRODUCT_LIST_V2:
      return {
        ...state,
        productList: action.payload,
      };

    default:
      return state;
  }
};

/*=====  End of REDUCER  ======*/
export default productListReducer;
