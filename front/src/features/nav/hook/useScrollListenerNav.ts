/*=============================================
=      USE SCROLL LISTENER NAV   =
=============================================*/
/**
 * Scroll listner navigation
 */

import { useEffect, useState } from "react";

//Types
import { IStore } from "@/redux/rootReducer";

//Libraries
import { useSelector, useDispatch } from "react-redux";

//Reducer
import { setIsShowNavAction } from "../redux/navSlice";

//maps state
const mapState = (state: IStore) => ({
  nav: state.nav,
});

/**
 * Scroll listner
 * Hnadle the nav header behavior when
 * the user scroll up / down
 * @returns
 */
export const useScrollListenerNav = (isEnableScrollListener:boolean) => {
  //State
  const {
    nav: { isShowNav },
  } = useSelector(mapState);
  const dispatch = useDispatch();

  //Styles changeing
  const [isTransparentBG, setIsTransparentBG] = useState(true);
  const [isShow, setIsShow] = useState(true);

  //Scroll values
  const [y, setY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const [generalShow, setGeneralShow] = useState(true);

  /**
   * Handle Scroll Element
   * Listener for scroll in a element
   * @param event
   */
  const handleScrollElement = (event: any) => {
    if (scrollTop  > event.currentTarget.scrollTop || scrollTop <= 20) {
      setScrollTop(event.currentTarget.scrollTop);
      dispatch(setIsShowNavAction(true));
    } else {
      setScrollTop(event.currentTarget.scrollTop);
      dispatch(setIsShowNavAction(false));
    }
  };

  /**
   * handle & detect scroll motion
   *
   * @param yLast last value of the y
   * @param yState the current value of y
   * @param setValue the function to update the value of y
   */
  const handleCallback = (
    yLast: number,
    yState: number,
    setValue: (value: number) => void
  ) => {
    if (yLast - 300 > yState || yLast <= 0) {
      setIsShow(true);
      setValue(yState);
    } else if (yLast + 100 < yState) {
      setIsShow(false);
      setValue(yState);
    }
    if (yState > 0) {
      setIsTransparentBG(false);
    } else {
      setIsTransparentBG(true);
    }
  };

  /**
   * Handle Navigation Events
   *
   * @param e event
   */
  const handleNavigation = (e: any) => {
    const window = e.currentTarget;
    handleCallback(y, window.scrollY, setY);
  };

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", (e) => handleNavigation(e));
    return window.removeEventListener("scroll", (e) => handleNavigation(e));
  }, [y, scrollTop]);


  useEffect(() => {
    if(isEnableScrollListener){
      setGeneralShow(isShow)
    }else{
      setGeneralShow(isShowNav)
    }
  },[isShow, isShowNav])
  return {
    isShowNav,
    isShow,
    showNav: generalShow,
    isTransparentBG,
    handleScrollElement,
  };
};
