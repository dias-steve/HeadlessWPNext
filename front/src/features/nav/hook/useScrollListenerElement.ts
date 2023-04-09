/*=============================================
=        useScrollListener              =
=============================================*/
/**
 * Scroll listener for Nav Bar
 *
 */

import React, { useEffect, useRef, useState } from "react";

/**
 * Scroll listener for Nav Bar
 * @param callbackScrollUp callback for scroll up
 * @param callbackScrollDown callback for scroll down
 * @returns
 */
export const useScrollListenerElement = (
  callbackScrollUp: () => void,
  callbackScrollDown: () => void
) => {
  /**
   *  Scroll Listener
   */

  const ref = useRef(null);
  const [isTransparentBG, setIsTransparentBG] = useState(true);
  const [y, setY] = useState(0);
  const [isShow, setIsShow] = useState(true);

  const handleNavigation = (e: any) => {
    const window: any = ref.current;
    if (window) {
      if (y - 300 > window.scrollY || y <= 0) {
        callbackScrollUp();
      } else if (y + 100 < window.scrollY) {
        callbackScrollDown();
      }
    }
  };

  useEffect(() => {
    setY(window.scrollY);
    console.log(window);
    window.addEventListener("scroll", (e) => handleNavigation(e));
    return window.removeEventListener("scroll", (e) => handleNavigation(e));
  }, [y]);

  return {
    isShowNav: isShow,
    isTransparentBG,
    ref,
  };
};
