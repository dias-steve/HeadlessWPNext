/*=============================================
=           Get Query Stock UNIT TEST          =
=============================================*/

import { IProductCart } from "../../types";
import { getQueryStock } from "../cart.utils";

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
      id_parent: "27",
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
      shipping_cost_unit: "0.2",
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

describe("get Query Stock", () => {
  it("Works with item in the cart", () => {
    const newCart = getQueryStock(INITIAL_CART);
    expect(newCart).toEqual(
      "?products=id_parent=21,id=23,quantity=3!id_parent=27,id=27,quantity=1"
    );
  });

  it("Works with nothing the cart", () => {
    const newCart = getQueryStock([]);
    expect(newCart).toEqual("");
  });
});
