/*=============================================
=        USE MOUSE POSITION    =
=============================================*/

/**
 * Get the mouse position
 */

//Libraries
import { useEffect, useState } from "react";

/**
 * Get Mousse position
 * @returns
 */
export default function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [isMoving, setIsMouving] = useState(true);
  const [y, setY] = useState(0);

  //set and update mouse position
  useEffect(() => {
    const mouseMoveHandler = (event: any) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
      setIsMouving(true);
    };
    document.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  // get if the mouse is moving
  useEffect(() => {
    setTimeout(() => {
      mousePosition;

      setIsMouving(false);
      setIsMouving(false);
    }, 500);
  }, [mousePosition]);

  const handleNavigation = (e: any) => {
    setIsMouving(true);
  };

  //get is the screen is scrolling
  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", (e) => handleNavigation(e));

    setTimeout(() => {
      setIsMouving(false);
    }, 500);
    return window.removeEventListener("scroll", (e) => handleNavigation(e));
  }, [y]);
  return { mousePosition, isMoving };
}
