/*=============================================
=           GET TOTAL QUATITY UNIT TEST          =
=============================================*/

import { IProductCart } from "../../types";
import { getTotalQunatityCart } from "../cart.utils";

/*=============================================
=            INITIAL CART            =
=============================================*/
const INITIAL_CART: IProductCart[] = [
  {
    product: {
      id: "23",
      id_parent: "21",
      title: "Hoodie with Zipper 2",
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
    },
    quantity: 3,
  },
  {
    product: {
      id: "27",
      id_parent: "21",
      title: "Hoodie with Zipper 1",
      name: "Hoodie with Zipper 1",
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
    },
    quantity: 1,
  },
];

/*=====  End of INITIAL CART  ======*/

/*=============================================
=            TESTING            =
=============================================*/
describe("Get Total Quantity", () => {
  it("works with items in cart", () => {
    const totalQuantity = getTotalQunatityCart(INITIAL_CART);

    expect(totalQuantity).toEqual(4);
  });
  it("works with nothing in the Cart", () => {
    const totalQuantity = getTotalQunatityCart([]);

    expect(totalQuantity).toEqual(0);
  });
});
