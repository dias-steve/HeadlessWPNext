/*=============================================
=            SINGLE PRODUCT SIDE EFFECT           =
=============================================*/
import { takeLatest, put, all, call, select } from "redux-saga/effects";

// Actions
import {
  setImageGalleryAction,
  setListVariations,
  setProductParent,
  setSelectedProduct,
  setVariationListDetailV2Action,
  setVariationListDetailed,
  setVariationSelected,
  setVariationStockStatus,
  singleProductTypes,
} from "./singleproduct.reducer";

// Utils
import {
  getChildBySelector,
  getFirstChildAvaible,
  getVariationAvailableValue,
} from "../utils/productVariationSelector.utils";

// types
import { IStore } from "@/redux/rootReducer";
import { IProductJSON, IProductStore, IProductVariant } from "../../types";
import { IImageGallerySilce, setImageGallery } from "./imageGallerySlice";

export const getSingleProduct = (state: IStore) => state.singleproduct;
export const getGallery = (state: IStore) => state.imageGallery
/**
 * setSingle product data to stotre
 *
 * Call at the initialisation of the
 * single product page
 *
 * @param {*} payload product data from the page
 */

export function* setSingleProductDataToStore({
  payload,
}: {
  payload: IProductJSON;
}) {
  //GETTING DATA FROM PAGE
  const { list_variations, variation_list_detail, product_is_variable, variation_list_detail_v2 } =
    payload;

  // UPDATE THE STATE OF THE SINGLE PRODUCT STATE
  yield put(setProductParent(payload));

  yield put(setVariationListDetailed(variation_list_detail));

  yield put(setVariationListDetailV2Action(variation_list_detail_v2))
  yield put(setListVariations(list_variations));

  // SETTING THE PRODUCT VARIATION
  let state: IProductStore = yield select(getSingleProduct);
  let stateGallery: IImageGallerySilce = yield select(getGallery);

  const { product_parent } = state;

  // getting the first product variant selected
  // if is vriable
  const childSelected: IProductJSON | IProductVariant =
    product_is_variable && product_parent.children
      ? getFirstChildAvaible(product_parent.children) || product_parent
      : product_parent;
  // Getting the variant value selected from this product variant selected
  const variationsSelectedArray =
    product_is_variable &&
    childSelected.variation_name &&
    product_parent.children
      ? getVariationAvailableValue(
          childSelected.variation_name,
          product_parent.children
        )
      : null;

  // UPDATING OF THE SINGLE PRODUCT STATE WITH THE PRODUCT VARIANT FOUND
  yield put(setVariationStockStatus(variationsSelectedArray));

  yield put(setVariationSelected(childSelected.variation_name));

  yield put(setSelectedProduct(childSelected));

  console.log()
  if(childSelected.images_gallery && stateGallery.imageList.length <= 0){
    yield put(setImageGallery(childSelected.images_gallery))
  }

}

/**
 * Set Variation selected Start
 *
 * Call when the option selected changed
 *
 * @param {*} payload new variation / option selected list
 */

export function* setVariationSelectedStart({
  payload,
}: {
  payload: { [variationKey: string]: string };
}) {
  let state: IProductStore = yield select(getSingleProduct);

  const { product_parent, variations_selected, product_selected } = state;
  const { children } = product_parent;

  // Update the variation / option selected
  const newVariationSelected = { ...variations_selected, ...payload };

  // if product parent is variable
  if (children) {
    // getting new product variant related to the new variation / option selectes
    const childSelected = getChildBySelector(newVariationSelected, children);

    const oneChildSelected =
      Array.isArray(childSelected) && childSelected.length >= 1
        ? childSelected[0]
        : { ...product_parent, product_is_in_stock: false };

    // getting the new status product matrix from the new viation / option selected
    const variationsSelectedArray = getVariationAvailableValue(
      newVariationSelected,
      children
    );

    // updating of the product single state
    yield put(setVariationStockStatus(variationsSelectedArray));

    yield put(setVariationSelected(newVariationSelected));

    yield put(setSelectedProduct(oneChildSelected));


  }
}

/*=====  End of Section SIDE EFFECT ======*/

/*=============================================
=            CONNECT        =
=============================================*/

export function* onSetParentProductStart() {
  yield takeLatest(
    singleProductTypes.ON_SET_PRODUCT_PARENT_START,
    setSingleProductDataToStore
  );
}

export function* onSetVariation() {
  yield takeLatest(
    singleProductTypes.SET_LIST_VARIATION_SELECTED_START,
    setVariationSelectedStart
  );
}

/*=====  End of Section Connect ======*/

export default function* singleProductSaga() {
  yield all([call(onSetVariation), call(onSetParentProductStart)]);
}
