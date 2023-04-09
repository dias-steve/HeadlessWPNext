import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { productReducers } from "@/features/woocommerce/productlist/redux";
import { IProductStore } from "@/features/woocommerce/types";

import { IProductListStore } from "@/features/woocommerce/productlist/types";
import checkoutReducer, {
  ICheckoutState,
} from "@/features/woocommerce/checkout/redux/checkoutSlice";
import singleProductReducerWC from "@/features/woocommerce/productsingle/redux/singleproduct.reducer";
import singleProductReducer from "@/features/woocommerce/productsingle/redux/singleproduct.reducer";
import cartReducer from "@/features/woocommerce/cart/redux/cart.reducer";
import { ICartStore } from "@/features/woocommerce/cart/types";
import { INavStoreType } from "@/features/nav/redux/navSlice";
import navReducer from "@/features/nav/redux/navSlice";
import settingsReducer, {
  ISettingsState,
} from "@/features/settings/redux/settingsSlice";
import dynamicBackgroundReducer, {
  IDinamycBackgroundStoreType,
} from "@/features/dynamicBackground/redux/dynamicBackgroundSlice";
import instaFeedReducer, {
  IInstaFeedSlice,
} from "@/features/instaFeed/redux/InstaFeedSlice";
import imageGalleryReducer, {
  IImageGallerySilce,
} from "@/features/woocommerce/productsingle/redux/imageGallerySlice";
import imageViewerSlice, {
  IImageViewerStore,
} from "@/features/ImageViewer/redux/ImageViewerSlice";
import toastSlice, { IToastStoreType } from "@/features/Toast/redux/toastSlice";
import  newsLetterReducer, { InewsLetterStoreType } from "@/features/newsletter/redux/newsLetterSlice";
import multiLangReducer, { IMultiLangStoreType } from "@/features/multiLang/redux/multiLangSlice";
import    modeMaintenanceReducer,{ IMaintenanceModeStoreType } from "@/features/maintenanceMode/redux/maintenanceModeSlice";
import woocommerceSettingsReducer, { IwoocommerceSettingsStoreType } from "@/features/woocommerce/woocommerceSettings/redux/woocommerceSettingsSlice";
import rgpdPopupReducer, { RGPDState } from "@/features/PopupRGPD/redux/RGPD.reducer";
export interface IStore {
  productlist: IProductListStore;
  singleproduct: IProductStore;
  cart: ICartStore;
  checkout: ICheckoutState;
  nav: INavStoreType;
  settings: ISettingsState;
  dynamicBackground: IDinamycBackgroundStoreType;
  instaFeed: IInstaFeedSlice;
  imageGallery: IImageGallerySilce;
  imageViewer: IImageViewerStore;
  toast: IToastStoreType;
  newsletter: InewsLetterStoreType;
  multiLang: IMultiLangStoreType;
  modeMaintenance: IMaintenanceModeStoreType;
  woocommerceSettings: IwoocommerceSettingsStoreType;
  rgpd: RGPDState;
}


export const rootReducer  = combineReducers({
  productlist: productReducers.productListReducer,
  singleproduct: singleProductReducerWC, //productReducers.singleProductReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  nav: navReducer,
  settings: settingsReducer,
  dynamicBackground: dynamicBackgroundReducer,
  instaFeed: instaFeedReducer,
  imageGallery: imageGalleryReducer,
  imageViewer: imageViewerSlice,
  toast: toastSlice,
  newsletter: newsLetterReducer,
  multiLang: multiLangReducer,
  modeMaintenance:modeMaintenanceReducer,
  woocommerceSettings: woocommerceSettingsReducer,
  rgpd: rgpdPopupReducer
});

const configStorage = {
  key: "root",
  storage,
  whitelist: ["cart", "multiLang", "modeMaintenance", "rgpd"],
};

export default persistReducer(configStorage, rootReducer);
