/*=============================================
=            USE TRANSITION Display Components          =
=============================================*/
/**
 * Mount and unmount Component with a delay for transition
 */

//Lib
import { FC, useEffect, useState } from "react"

/**
 * Mount and unmount Component with a delay for transition
 * 
 * @param isDisplayComponent boolean indicating when the application want to display the component
 * @param transitionDelay the delay in milliseconds to to process the CSS transition
 * @returns 
 */
export const  useTranstionDisplayComponents = (isDisplayComponent : boolean, transitionDelay: number) => {
    const [isKillmodal, setKillModal] = useState(true)
    const [itWillClose, setWillClose] = useState(true)
    useEffect(() => {
      if(!isDisplayComponent){

        setWillClose(true)
        setTimeout(() => {
          setKillModal(true)
        }, transitionDelay+100)
      }else{
        setKillModal(false)
        setTimeout(() => {
          setWillClose(false)
        }, 10)
      }
    }, [isDisplayComponent])
    return {
        isKilledComponent : isKillmodal,
        isWillBeKilledCompponent : itWillClose,
    }
}
