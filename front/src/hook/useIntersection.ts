import { useState, useEffect, useRef } from 'react'

export const useIntersection = (callback: () => void, oneWay: boolean) => {
    const [isVisible, setState] = useState(false);
   const element : any = useRef(null)
   const options = {
    threshold: 1,
    root:null,
    rootMargin:'0px'
  };


  const call = (entries : any) => {
  
        const [entry] = entries

        if (entry.isIntersecting) {
     
          setState(true)
            callback();
        }else{
          if (!oneWay){
          setState(false)
          }else{
            if(entry.boundingClientRect.y >= 0){
              setState(false)
            }
          }
        }
      };
 


    useEffect(() => {

        const observer = new IntersectionObserver(call, options);
        observer.observe(element.current);
        return () =>{   observer.disconnect()};

    }, [element, options]);
    return [
        element, isVisible];
};