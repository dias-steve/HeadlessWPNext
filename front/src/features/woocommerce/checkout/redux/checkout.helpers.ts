/*=============================================
=            HELPEL FOR CHECKOUT             =
=============================================*/

/**
 * Get the list of ZoneShippement from
 * woocommerce backend
 * @returns
 */
export const handleFetchShippingData = () => {
  return new Promise((resolve, reject) => {
    fetch(process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/shippings", {
      method: "GET",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};
