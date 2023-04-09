/*=============================================
=       USE SINGLE PRODUCT      =
=============================================*/
/**
 * Manage the product data
 */

//Libraries
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Types
import { IProductJSON } from "../../types";

//Reducers
import { IStore } from "@/redux/rootReducer";
import { setParentProductStart } from "../redux/singleproduct.reducer";
//Hooks
import { useRouter } from 'next/router'
//MapState
const mapState = (state: IStore) => ({
  singleProduct: state.singleproduct,
});
/**
 * Manage single product data
 * @param parentProduct Root Product data use to initialize the page
 * @returns 
 */
export const useSingleProduct = (parentProduct: IProductJSON | null, initialisationPage: boolean) => {
  const dispatch = useDispatch();
  const { singleProduct } = useSelector(mapState);
  const router = useRouter()

  // setting the single product data
  useEffect(() => {
    if (parentProduct) {
      dispatch(setParentProductStart(parentProduct));
    }else{
      if(initialisationPage &&(singleProduct.product_parent.id === null ||singleProduct.product_parent.id ==='')){
        router.push('/404')
      }
    }

  }, []);



  const productSelected = singleProduct.product_selected;
  const parentProductinState = singleProduct.product_parent;
  const name = productSelected.name || "name";
  const available = productSelected.product_is_in_stock || false;
  const id = productSelected.id || "";

  //Getting data from the store
  const { images_gallery, price, regular_price, on_sale, product_is_in_stock } =
    productSelected;
  const { description, title_displayed, size_guide, up_sell_product_list, product_is_variable, sold_individualy, multi_price:{have_multi_price, price_min} } =
    parentProductinState;

  return {
    name,
    available,
    id,
    images_gallery,
    description,
    title_displayed,
    size_guide,
    price,
    regular_price,
    on_sale,
    product_is_in_stock,
    up_sell_product_list,
    product_is_variable,
    sold_individualy,
    have_multi_price,
    price_min,
    general_information: parentProductinState.general_information
  };
};
