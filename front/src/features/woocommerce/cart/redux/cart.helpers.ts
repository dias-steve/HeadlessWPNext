/*===================================================================
=           Cart Helpers                                          =
====================================================================*/

/**
 * Helper to fetch the status stock of the list of items
 * @param query : string with the schema : ?products=id=3,idparent=3,quantity=3!...
 * @returns
 */
export const handleFetchStatutStock = (query: string) => {
  return new Promise((resolve, reject) => {
    fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA +
        "/products/stocks" +
        query,
      {
        // Adding method type
        method: "GET",

        // Adding headers to the request
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
