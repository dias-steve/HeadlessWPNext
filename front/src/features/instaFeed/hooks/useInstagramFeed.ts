/*=============================================
=     useInstagramFeed    =
=============================================*/

/**
 * Hook to get insta post from instagram
 */

//Library
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//types
import { IPostInstagram } from "../types";

//State
import { IStore } from "@/redux/rootReducer";
import { setPostList } from "../redux/InstaFeedSlice";

//Mapstate
const mapState = (state: IStore) => ({
  instaFeed: state.instaFeed,
});

/**
 * Hook to get insta post from instagram
 * @param counter nb of insta posts
 * @param token token of the instagram account
 * @returns list of post intragrams
 */
export const useInstagramFeed = (counter: number, token: string) => {
  const { instaFeed } = useSelector(mapState);
  const { postsList } = instaFeed;
  const placeholder: any = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const type = showImage ? "hidePlaceholder" : "placeholder";

  const dispatch = useDispatch();

  let url = `/api/instagram/posts`;
  const fetchData = async () => {
    setIsLoading(true);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.data) {
          dispatch(setPostList(result.data));
        }

        console.log(
          "JavaScript version is here https://codecanyon.net/item/instaget-javascript-library-for-instagram/26300578"
        );
      })
      .catch((error) => setIsError(true));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // intersection observer set-up
  }, []);

  return {
    placeholder,
    isLoading,
    isError,
    data: postsList,
    counter,
  };
};
