/*=============================================
=            SINGLE PRODUCT UTILS        =
=============================================*/
/**
 * Functions to manage the product Single Page
 * Selector
 * diplaying
 */

// types
import { IProductVariant } from "../../types";

/**
 * Get Child Selector
 *
 * @param variationsSelected options selectd by the user
 * @param childrensProduct list of product child of the product
 * @returns the product list related the option seleted
 */
export const getChildBySelector = (
  variationsSelected: { [variationKey: string]: string },
  childrensProduct: IProductVariant[]
): IProductVariant[] => {
  let good = childrensProduct;
  const variations = Object.keys(variationsSelected);
  for (let i = 0; i < variations.length; i++) {
    good = good.filter((child) =>
      filterVariation(child, variations[i], variationsSelected[variations[i]])
    );
  }

  if (Array.isArray(good) && good.length >= 1) {
    return good;
  } else {
    return [];
  }
};

/**
 * filterVariation
 *
 * if the child have the same value option in
 * its list of variations
 *
 * @param child product variant
 * @param variationName key of the variation / option
 * @param variationValue value of the variation / option
 * @returns boolean
 */
export function filterVariation(
  child: IProductVariant,
  variationName: string,
  variationValue: string
): boolean {
  if (child.variation_name)
    if (child.variation_name[variationName] === variationValue) {
      return true;
    }
  return false;
}

/**
 * Get List Variation Value Available
 *
 * return the stock status of each vaiant product
 * related to list of vairiant selcted
 *
 * it's for enable or disable the btn option
 * displayed
 *
 *
 * @param variationsSelected list of variations selected by the user
 * @param variationKey variation key destinated for
 * @param childrensProductList list of product variant
 * @returns status stock for each btn option of the variation key
 */
export function getListVariationValueAvailble(
  variationsSelected: { [variationKey: string]: string },
  variationKey: string,
  childrensProductList: IProductVariant[]
): { [varaitionKey: string]: { [variationValue: string]: boolean } } {
  // removing of the variation key from the variation selected filter
  const variableSelectedfilter = Object.entries(variationsSelected).reduce(
    (acc, current) => {
      const [key, value] = current;
      if (key !== variationKey) {
        acc = { ...acc, [key]: value };
      }
      return acc;
    },
    {}
  );

  //Getting the product variant which have the variation selected
  const listchildProduct = getChildBySelector(
    variableSelectedfilter,
    childrensProductList
  ).reduce(
    (listValue, child) => {
      const { variation_name, product_is_in_stock } = child;
      ``;
      if (variation_name) {
        const valueName = variation_name[variationKey];
        return (listValue = { ...listValue, [valueName]: product_is_in_stock });
      }
      return listValue;
    },

    {}
  );

  return { [variationKey]: listchildProduct };
}

/**
 * Get First Child Available Product
 *
 * Return the first child available product
 * It used when the user change the option value
 *
 * @param children list of product variant selected
 * @returns the first product available from the list
 */
export function getFirstChildAvaible(
  children: IProductVariant[]
): IProductVariant {
  return children.filter((child) => {
    return child.product_is_in_stock;
  })[0];
}

/**
 * get Variation Available Value
 *
 * return the status stock by option value / variation value
 *
 *
 * @param variationSelected list of option / variant selected
 * @param children list of product variant
 * @returns statust stock of option value matrix
 */
export function getVariationAvailableValue(
  variationSelected: { [variationKey: string]: string },
  children: IProductVariant[]
): { [varaitionKey: string]: { [variationValue: string]: boolean } } {
  return Object.keys(variationSelected).reduce((acc, current) => {
    const listValueAvaible = getListVariationValueAvailble(
      variationSelected,
      current,
      children
    );

    return { ...acc, ...listValueAvaible };
  }, {});
}
