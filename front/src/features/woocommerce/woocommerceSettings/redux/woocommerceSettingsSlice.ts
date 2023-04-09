/*=============================================
=            MENU SLICE            =
=============================================*/

//library
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//Utils

import { IWooCommerceSettings } from "../../types";

/*=============================================
=            woocommerceSettings STORE TYPE          =
=============================================*/
export interface IwoocommerceSettingsStoreType {
  woocommerceSettings: IWooCommerceSettings;
}

/*=============================================
=            woocommerceSettings INITIAL STATE        =
=============================================*/

const initialState: IwoocommerceSettingsStoreType = {
  woocommerceSettings: {
    stripe_settings: {
      prod_mode_is_activated: false,
      test_mode_is_activated: false,
      page_link_gcs: false,
      info_text_gcs: false,
    },
    wc_pages: {
      myaccount_page_id: -1,
      shop_page_id: -1,
      cart_page_id: -1,
      checkout_page_id: -1,
      terms_page_id: -1,
    },
  },
};

/*=============================================
=           woocommerceSettings ACTION      =
=============================================*/

const woocommerceSettingsSlice = createSlice({
  name: "woocommerceSettings",
  initialState,
  reducers: {
    setWoocommerceSettingsAction: (state, action) => {
      state.woocommerceSettings= action.payload;
    },

  },
});

export const {
    setWoocommerceSettingsAction
} = woocommerceSettingsSlice.actions;

export default woocommerceSettingsSlice.reducer;
