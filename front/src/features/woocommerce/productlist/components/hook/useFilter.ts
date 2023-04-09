/*=============================================
=        useFilter   =
=============================================*/
/**
 * Manage the filter of a product list and the list of products
 */

//Libraries
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

//Reducer
import {
  fetchProductListStart,
  addCategoryToFilter,
  setCategoriesDataAction,
  setCategoriesSelectedAction,
  setCategoriesParentBackAction,
  setIdCategoryOriginAction,
  resetStateAction,
  setCategoryPageInfoAction,
} from "../../redux/productList.reducer";
import { IStore } from "@/redux/rootReducer";

//types
import { IcategorieDataJSON } from "../../types";

//utils
import {
  getProductCatByParentId,
  getCategoryInfoByID,
} from "../../utils/productFilter.utils";

/**
 * Manage the filtering of products
 * @param categorieData list of categories available
 * @returns
 */
export const useFilter = (categorieData: null | IcategorieDataJSON) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { productcat } = router.query;
  const getProductbyCat = (catId: number | string) => {
    dispatch(addCategoryToFilter({ idCategory: catId, idParent: null }));
  };

  /**
   * Goes back to the category parent
   * and display his child
   */
  const setProductCatParentBack = () => {
    dispatch(setCategoriesParentBackAction());
  };

  /**
   * Fetch all the products
   */
  const fetchAllPorduct = () => {
    dispatch(fetchProductListStart(null));
  };

  /**
   * Fetch product related of a category
   */
  const fetchProductCatParams = () => {
    dispatch(resetStateAction());
    if (categorieData) {
      dispatch(setCategoriesDataAction(categorieData));
    }

    if (productcat && !Array.isArray(productcat)) {
      getProductbyCat(productcat);

      dispatch(setIdCategoryOriginAction(productcat));
    } else {
      fetchAllPorduct();
      dispatch(setIdCategoryOriginAction(0));
    }
  };

  /**
   * Hydrates the state of the category data
   * in order to display the category information
   */
  const setCategoriesDataToStore = () => {
    if (categorieData) {
      dispatch(setCategoriesDataAction(categorieData));

      if (productcat && !Array.isArray(productcat)) {
        const newList = getProductCatByParentId(
          Number(productcat),
          categorieData.categorie_flat
        );
        const categoryInfo = getCategoryInfoByID(
          Number(productcat),
          categorieData.categorie_flat
        );

        if (categoryInfo) {
          dispatch(setCategoryPageInfoAction(categoryInfo));
        }
        const parentName = newList[0]?.parent_name
          ? newList[0].parent_name
          : "FR=Tout|EN=All";
        dispatch(
          setCategoriesSelectedAction({
            parentId: Number(productcat),
            listCategoriesSelected: getProductCatByParentId(
              Number(productcat),
              categorieData.categorie_flat
            ),
            nameParent: parentName,
          })
        );
      } else {
        dispatch(
          setCategoriesSelectedAction({
            parentId: 0,
            listCategoriesSelected: getProductCatByParentId(
              0,
              categorieData.categorie_flat
            ),
            nameParent: "FR=Tout|EN=All",
          })
        );
      }
    }
  };
  //Initiatisation of the page
  useEffect(() => {
    dispatch(resetStateAction());
    setCategoriesDataToStore();
  }, []);

  //Refresh the state for the category
  useEffect(() => {
    dispatch(resetStateAction());
    fetchProductCatParams();
    setCategoriesDataToStore();
  }, [productcat]);

  return {
    setProductCatParentBack,
    getProductbyCat,
    fetchAllPorduct,
    fetchProductCatParams,
  };
};
