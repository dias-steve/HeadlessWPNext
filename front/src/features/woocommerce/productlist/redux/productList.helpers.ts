/*=============================================
=            Product List Helpers            =
=============================================*/
/**
 * All fetch function for the product list
 * 
 */


/**
 * Get the prooduct list from Woocommerce backend
 * with filter 
 * @param query the query as products?sort=-_price&taxinomy=product_cat=18&limit=-1&page=2&postin=14,21&numericalfilter=_price<90!_price>10
 * @returns 
 */

export const handleFetchProductList = (query : string) => {
  return new Promise((resolve, reject) => {
    fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/products" + query,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};
