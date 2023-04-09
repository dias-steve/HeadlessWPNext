/*=============================================
=           use DynamicBackgroundObserver         =
=============================================*/

/**
 * Switch the backgroung color to black when de visition scross 
 * the a landmark
 */

//Libraries
import { useEffect, useRef } from "react";
//Hooks
import { useDynamicBackground } from "./useDynamicBackground";

/**
 * Switch the backgroung color to black when de visition scross 
 * the a landmark
 * @returns 
 */
export const useDynamicBackgroundObserver = () => {
    const refLandmarkChangeBGColor: any = useRef(null)
    const {setBlackBackground, setWhiteBackground} = useDynamicBackground()
    const options = {
        threshold: 1.0
      };

    const callback = (entries : any) => {
  
        entries.forEach((entry: any) => {
   
            if (entry.isIntersecting) {
         
                setBlackBackground()
            }else{
                if(entry.boundingClientRect.y >= 0){
                    setWhiteBackground()
                }
            }
          });
     
    };


   useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    observer.observe(refLandmarkChangeBGColor.current);
    return () => {
        observer.disconnect()}

        
},[])
    return{
        refLandmarkChangeBGColor
    }
}