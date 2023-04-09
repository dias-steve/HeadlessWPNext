/*=============================================
=           Add to Cart UNIT TEST          =
=============================================*/

import { IProductJSON } from "@/features/woocommerce/types";
import { addToCart } from "../cart.utils";
import { IProductCart } from "../../types";

/*=============================================
=            INITIAL CART            =
=============================================*/

const INITIAL_CART: IProductCart[] = [];
export const PRODUCT_CART_1: IProductJSON = {
  id: "23",
  id_parent: "21",
  title: "Hoodie with Zipper",
  name: "Hoodie with Zipper",
  price: "234.99",
  regular_price: "45",
  sale_price: "",
  link: "/product/21",
  images_gallery: [],
  sold_individualy: false,
  children: null,
  on_sale: false,
  product_is_in_stock: true,
  list_variations: null,
  variation_list_detail: null,
  product_is_variable: false,
  multi_price: {
    have_multi_price: false,
    price_min: "0",
    price_max: "0",
  },
  thumnail: null,
  shipping_cost_unit: "0",
  variation_name: null,
  free_shipping: null,
};

export const PRODUCT_CART_UNIQUE: IProductJSON = {
  id: "27",
  id_parent: "21",
  title: "Hoodie with Zipper",
  name: "Hoodie with Zipper",
  price: "34.99",
  regular_price: "45",
  sale_price: "",
  link: "/product/21",
  images_gallery: [],
  sold_individualy: true,
  children: null,
  on_sale: false,
  product_is_in_stock: true,
  list_variations: null,
  variation_list_detail: null,
  product_is_variable: false,
  multi_price: {
    have_multi_price: false,
    price_min: "0",
    price_max: "0",
  },
  thumnail: null,
  shipping_cost_unit: "0",
  variation_name: null,
  free_shipping: null,
};

/*=====  End of INITIAL CART  ======*/

/*=============================================
=            TESTING            =
=============================================*/

describe("Add to cart a new item", () => {
  /**
   * Adding a new item to the cart
   */
  it("works with a new item", () => {
    const newCart: IProductCart[] = addToCart(PRODUCT_CART_1, 1, []);
    expect(newCart).toMatchObject([
      {
        product: { id: "23" },
        quantity: 1,
      },
    ]);
  });

  /**
   * Adding a new item to the empty cart
   */
  it("works with a item in cart whit this item", () => {
    const newCart: IProductCart[] = addToCart(PRODUCT_CART_1, 1, INITIAL_CART);
    const newCart2: IProductCart[] = addToCart(PRODUCT_CART_1, 1, newCart);
    expect(newCart2).toMatchObject([
      {
        product: { id: "23" },
        quantity: 2,
      },
    ]);
  });

  /**
   * Adding different items to the cart
   */
  it("works with a item tow different item", () => {
    const newCart: IProductCart[] = addToCart(PRODUCT_CART_1, 1, INITIAL_CART);
    const newCart2: IProductCart[] = addToCart(PRODUCT_CART_UNIQUE, 1, newCart);

    expect(newCart2).toMatchObject([
      {
        product: { id: "23" },
        quantity: 1,
      },
      {
        product: { id: "27" },
        quantity: 1,
      },
    ]);
  });

  /**
   * Addind 2 item unique to cart
   */
  it("works with a item unique", () => {
    const newCart: IProductCart[] = addToCart(
      PRODUCT_CART_UNIQUE,
      1,
      INITIAL_CART
    );
    const newCart2: IProductCart[] = addToCart(PRODUCT_CART_UNIQUE, 1, newCart);
    expect(newCart2).toMatchObject([
      {
        product: { id: "27" },
        quantity: 1,
      },
    ]);
  });
});

/*=====  End of TESTING  ======*/
