/*=============================================
=            CART UTILS            =
=============================================*/

import { IProductJSON, IProductVariant } from "../../types";
import { IProductCart, IProductStockSatusBody } from "../types";

/**
 * Add to Cart *********************************************************
 * 
 * Adding a product whit its quantity to the cart
 * @param product
 * @param quantity
 * @param listItem
 * @returns
 */
export const addToCart = (
  product: IProductJSON | IProductVariant,
  quantity: number,
  listItem: IProductCart[]
): IProductCart[] => {
  let isAdded = false;
  const newListItem: IProductCart[] = listItem.map((item) => {
    if (product.id === item.product.id) {
      isAdded = true;
      if (!product.sold_individualy) {
        return { ...item, quantity: item.quantity + quantity };
      }
      return { ...item, quantity: 1 };
    }
    return item;
  });
  if (isAdded) {
    return newListItem;
  }
  return [...listItem, { product: product, quantity: quantity }];
};

/**
 * Add to Cart *********************************************************
 * 
 * Adding a product whit its quantity to the cart
 * @param product
 * @param quantity
 * @param listItem
 * @returns
 */
export const isInCart = (
  product: IProductJSON | IProductVariant,
  listItem: IProductCart[]
): boolean => {
 
  const newListItem: IProductCart[] = listItem.filter((item) => {
    return product.id === item.product.id
  });
 
  return newListItem.length > 0;
};

/**
 * Remove to Cart ****************************************************
 * 
 * remove a item and its quantity from the cart
 * @param productId
 * @param quantity
 * @param listItem
 * @returns
 */
export const removeToCart = (
  productId: number | string,
  quantity: number,
  listItem: IProductCart[]
): IProductCart[] => {
  const newListItem: IProductCart[] = listItem.reduce<IProductCart[]>(
    (newlist, item) => {
      if (item.product.id === productId) {
        const newQuantity = item.quantity - quantity;
        if (newQuantity > 0) {
          return newlist.concat({ ...item, quantity: newQuantity });
        } else {
          return newlist;
        }
      } else {
        return newlist.concat(item);
      }
    },
    []
  );
  return newListItem;
};

/**
 * Get Total Quantity *****************************************************
 * 
 * @param listItem : list of items in the cart
 * @returns sum of all quantity
 */
export const getTotalQunatityCart = (listItem: IProductCart[]): number => {
  if (listItem){
    return listItem.reduce<number>((total, item) => {
      total = total + Number(item.quantity);
      return total;
    }, 0);
  }

  return 0;
};

/**
 * get Total Price ************************************************************
 * 
 * @param listItem : list of items in the cart
 * @returns the sub total of the price * quantity of item
 */
export const getTotalPrice = (listItem: IProductCart[]): number => {
  if (listItem){
    return listItem.reduce<number>((total, item) => {
      total = total + Number(item.quantity) * Number(item.product.price);
      return Number(total.toFixed(2));
    }, 0);
  }
  return 0
};

/**
 * Get Queyr stock ************************************************************
 * 
 * Generate the right query string to send to the WP Backend
 * @param listItem : list items in the cart
 * @returns query with this schema : ?products=id=2,id_parent=2,quantity=1!
 */
export const getQueryStock = (listItem: IProductCart[]): string => {
  return listItem.reduce<string>((query, item, index) => {
    return (
      query +
      (index === 0 ? "?products=" : "") +
      (index > 0 ? "!" : "") +
      "id_parent=" +
      item.product.id_parent +
      "," +
      "id=" +
      item.product.id +
      "," +
      "quantity=" +
      item.quantity
    );
  }, "");
};

/**
 * Get Total Shipping Cost *********************************************************
 * 
 * Calcul the total shipping cost with the shipping cost units
 * @param shippingCost base cost for shipping
 * @param listItem : list items in the cart
 * @returns : the total cost for shipping this items
 */
export const getTotalShippingCost = (
  shippingCost: number,
  listItem: IProductCart[]
): number => {
  const result: number = listItem.reduce<number>((total, item, index) => {
    if (!item.product.free_shipping) {
      if (item.product.shipping_cost_unit) {
        total =
          total +
          Number(item.product.shipping_cost_unit) *
            Number(shippingCost) *
            Number(item.quantity);
      }
      if (index === listItem.length - 1) {
        total = total + Number(shippingCost);
      }
    }
    return total;
  }, 0);

  return Number(Number(result).toFixed(2));
};

/**
 * Fetch Cart Stock Status *****************************************************************
 * 
 * Send request to the backend to receive the list of stock status of each items in the cart
 * @param listItem : list item in the cart
 * @returns
 */
export const fetchCartStockStatus = async (listItem: IProductCart[]) => {
  try {
    const query: string = getQueryStock(listItem);
    const result = await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA +
        "/products/stocks" +
        query,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const resultJson = await result.json();
    return resultJson;
  } catch (err) {
    throw { message: "error backend to fetch stock status" };
  }
};
