/*=============================================
=            PRODUCTLIST SIDE EFFECT           =
=============================================*/
import { takeLatest, put, all, call, select } from "redux-saga/effects";
//actions
import {
  setIsLoading,
  productListTypes,
  setFilter,
  fetchProductListStart,
  setFilterStartAction,
  setProductListAction,
  setCategoriesSelectedAction,
  setMaxPage,
  setCurrentPage,
} from "./productList.reducer";
//helpers
import { handleFetchProductList } from "./productList.helpers";

//types
import { IProductJSON, IRequestProductListFromBack } from "../../types";
import { IProductListStore } from "../types";
//models
import FilterProduct from "../model/product/filterProductList/FilterProduct";
import { getProductCatByParentId } from "../utils/productFilter.utils";
import { mapState } from "../../checkout/components/ShippingtList/_ShippingListfunc";

//LimitProductByPage
const LIMIT_PRODUCT_BY_PAGE = 6;

//Maps state
export const getProductList: any = (state: any): IProductListStore =>
  state.productlist;

/*=============================================
=            PRODUCTLIST SIDE EFFECT           =
=============================================*/
/**
 * Fetch product list from the bakcend
 * @param {*} param0
 */
export function* fetchProductList(dataP: any) {
  const filter: FilterProduct = dataP.payload;
  try {
    yield put(setIsLoading(true));

    // GETTING QUERY

    let query = "";
    if (filter) {
      filter.setLimit(LIMIT_PRODUCT_BY_PAGE);
      query = filter.getQueryString();
    } else {
      const newfilter = new FilterProduct();
      newfilter.setLimit(LIMIT_PRODUCT_BY_PAGE);
      query = newfilter.getQueryString();
    }

    //GETTING RESULTS FROM BACKEND
    const { data }: IRequestProductListFromBack = yield handleFetchProductList(
      query
    );

    const {
      result,
      nb_hit,
      page: { max_page, current_page },
    } = data;

    //SETTING RESULT TO STORE
    yield put(setProductListAction(result));

    yield put(setIsLoading(false));

    //PAGINATION
    yield put(setMaxPage(max_page));
  } catch (err) {
    yield put(setIsLoading(false));
    console.log(err);
    //TODO: ERROR MESSAGE
  }
}

/**
 * Add Category to filter
 * Call when the user add a category in the filter
 * @param {*} payload : id of the category
 */
export function* addCategoryToFilter(data: any) {
  // GETTING FILTER STATE
  let state: IProductListStore = yield select(getProductList);
  const {
    filter,
    product_categories_data,
    idCategoryOrigin,
    product_categories_selected,
  } = state;

  const payload: { idCategory: number | string; idParent: number | null } =
    data.payload;
  // ADDING CATEGORI IN THE FILTER
  const idCategoryToAdd: number = Number(payload.idCategory);
  //the parent to go back
  const idParentToPut: number | null = Number(payload.idParent);

  //Getting the child of the category
  const newlist = getProductCatByParentId(
    idCategoryToAdd,
    product_categories_data.categorie_flat
  );

  // if the categpry has child
  if (newlist.length > 0) {
    const idParent = idParentToPut;
    const paraent_name = newlist[0].parent_name
      ? newlist[0].parent_name
      : "FR=Tout|EN=All";

    //if the category is different from the parent
    // When the user clicks on the all from the category 
    //We don't want to refresh
    if (
      product_categories_selected?.listCategoriesSelected &&
      product_categories_selected.listCategoriesSelected.length > 0 &&
      product_categories_selected.listCategoriesSelected[0].parent !==
        idCategoryToAdd
    ) {
      //Update list categories selected
      yield put(
        setCategoriesSelectedAction({
          parentId: idParent,
          listCategoriesSelected: newlist,
          nameParent: paraent_name,
        })
      );
    }
    //clean the old taxonomy
    filter.removeTaxonomy("product_cat");
    //add the category all
    filter.addItemInTaxinomieFilter("product_cat", idCategoryToAdd);
    filter.setPage(1);
    yield put(setCurrentPage(1));
    //update the productList
    yield put(fetchProductListStart(filter));
  } else {
    //if the category haven't child
    
    //if no more go back
    if (idParentToPut !== null) {
      filter.removeItemInTaxinomieFilter("product_cat", idParentToPut);
    }

    //add the category 
    filter.addItemInTaxinomieFilter("product_cat", idCategoryToAdd);
    filter.setPage(1);
    yield put(setCurrentPage(1));
    //update
    yield put(setFilterStartAction(filter));
  }
}

/**
 *Remove category from filter
 * @param {*} payload : id of the category to remove
 */
export function* removeCategoryToFilter(data: any) {
  // GETTING THE CURRENT FILTER STATE
  let state: IProductListStore = yield select(getProductList);
  const { filter } = state;

  //REMOVING THE CATEGORY FROM THE FILTER
  const idCategoryToRemove: number = Number(data.payload);
  filter.removeItemInTaxinomieFilter("product_cat", idCategoryToRemove);

  // UPDATE THE FILTER STATE
  // AND PUSH TO THE BACKEND TO FETCH PRODUCT LIST RELATED
  filter.setPage(1);
  yield put(setCurrentPage(1));
  yield put(setFilterStartAction(filter));
}

/**
 * set Filter Start
 *
 * Update the filter state and
 * Fecth the list porduct related to the filter
 *
 * @param payload: filter
 */
export function* setFilterStart(data: any) {
  // UPDATE THE FILTER STATE
  const filter: FilterProduct = data.payload;
  yield put(setFilter(filter));

  // FETCH PRODUCT LIST RELATED AND UPDATE IT
  yield put(fetchProductListStart(filter));
}

/**
 * Set Sort to filter
 *
 *
 * @param {*} payload : {key: varaible to sort, isASC: the kind of sorting}
 *  exemple {key: price, isACS: false}
 */

export function* setSortToFilter(data: any) {
  let state: IProductListStore = yield select(getProductList);
  const { filter } = state;

  const { key: keyBtn, isASC } = data.payload;

  // CONVERT THE KEY TO THE WC KEY
  if (keyBtn === "price") {
    filter.setSortFilter("_price", isASC);
    // UPDATE
    yield put(setFilterStartAction(filter));
  }
}

/**
 * set Categorie Parent back
 *
 * to go back to the previous category childs
 */
export function* setCategoriesParentBack() {
  // GETTING FILTER SATE
  let state: IProductListStore = yield select(getProductList);
  const {
    filter,
    idCategoryOrigin,
    product_categories_selected: { parentId },
    product_categories_data,
  } = state;

  //if parentId exists
  if (parentId !== null) {
    const newlist = getProductCatByParentId(
      parentId,
      product_categories_data.categorie_flat
    );
    // if the parendCategory have childs
    if (newlist.length > 0) {
      //if the parent is the category origin of the page
      // we wan't go back further
      const idParent = idCategoryOrigin !== parentId ? parentId : null;

      const nameParent = newlist[0].parent_name
        ? newlist[0].parent_name
        : "FR=Tout|EN=All";
      yield put(
        setCategoriesSelectedAction({
          parentId: idParent,
          listCategoriesSelected: newlist,
          nameParent: nameParent,
        })
      );
      filter.removeTaxonomy("product_cat");
      filter.setPage(1);
      yield put(setCurrentPage(1));
      yield put(fetchProductListStart(filter));
    }
  }
}

/**
 * SetCurrnetPageStart
 *
 * Set the new current page of the product list
 * @param data currnet page
 */
export function* setCurrentPageStart(data: any) {
  let state: IProductListStore = yield select(getProductList);
  const { filter, currentPage, maxPage } = state;
  const newCurrentPage: number = data.payload;

  //if the new current page is in boundaries
  if (
    newCurrentPage &&
    maxPage &&
    newCurrentPage > 0 &&
    newCurrentPage <= maxPage
  ) {
    filter.setPage(newCurrentPage);
    yield put(setCurrentPage(newCurrentPage));

    //Fetch new product list
    yield put(fetchProductListStart(filter));
  }
}

/**
 * Set the next page
 * @param data null
 */
export function* setNextCurrentPageStart(data: any) {
  let state: IProductListStore = yield select(getProductList);
  const { filter, currentPage, maxPage } = state;
  if (currentPage) {
    const newCurrentPage: number = currentPage + 1;
    //if the new current page is in boundaries
    if (
      newCurrentPage &&
      maxPage &&
      newCurrentPage > 0 &&
      newCurrentPage <= maxPage
    ) {
      filter.setPage(newCurrentPage);
      yield put(setCurrentPage(newCurrentPage));

      //Fetch new product list
      yield put(fetchProductListStart(filter));
    }
  }
}

/**
 * Set the previous page
 * @param data null
 */
export function* setPrevCurrentPageStart(data: any) {
  let state: IProductListStore = yield select(getProductList);
  const { filter, currentPage, maxPage } = state;

  if (currentPage) {
    const newCurrentPage: number = currentPage - 1;
    //if the new current page is in boundaries
    if (
      newCurrentPage &&
      maxPage &&
      newCurrentPage > 0 &&
      newCurrentPage <= maxPage
    ) {
      filter.setPage(newCurrentPage);
      yield put(setCurrentPage(newCurrentPage));
      //Fetch new product list
      yield put(fetchProductListStart(filter));
    }
  }
}

/*=====  End of Section SIDE EFFECT ======*/

/*=============================================
=            CONNECT            =
=============================================*/

export function* onSetCurrentPage() {
  yield takeLatest(
    productListTypes.SET_CURRENT_PAGE_START,
    setCurrentPageStart
  );
}

export function* onSetPrevPage() {
  yield takeLatest(
    productListTypes.SET_PREV_PAGE_START,
    setPrevCurrentPageStart
  );
}

export function* onSetNextPage() {
  yield takeLatest(
    productListTypes.SET_NEXT_PAGE_START,
    setNextCurrentPageStart
  );
}
export function* onFetchProductListStart() {
  yield takeLatest(productListTypes.FETCH_PRODUCT_LIST_START, fetchProductList);
}

export function* onAddCategoryToFilter() {
  yield takeLatest(productListTypes.ADD_CATEGORY_FILTER, addCategoryToFilter);
}

export function* onSetCategoriesBack() {
  yield takeLatest(
    productListTypes.SET_CATEGORIES_PARENT_BACK,
    setCategoriesParentBack
  );
}

export function* onRemoveCategoryToFilter() {
  yield takeLatest(
    productListTypes.REMOVE_CATEGORY_FILTER,
    removeCategoryToFilter
  );
}

export function* onSetSortFilter() {
  yield takeLatest(productListTypes.SET_SORT_FILTER, setSortToFilter);
}

export function* onSetFilterStart() {
  yield takeLatest(productListTypes.SET_FILTER_START, setFilterStart);
}



/*=====  End of CONNECT ======*/

export default function* listProductSaga() {
  yield all([
    call(onFetchProductListStart),
    call(onAddCategoryToFilter),
    call(onRemoveCategoryToFilter),
    call(onSetSortFilter),
    call(onSetFilterStart),
    call(onSetCategoriesBack),
    call(onSetCurrentPage),
    call(onSetPrevPage),
    call(onSetNextPage),
  ]);
}
