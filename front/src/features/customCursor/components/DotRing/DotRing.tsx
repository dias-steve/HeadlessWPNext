/*=============================================
=          DotRing Cursor       =
=============================================*/

/**
 * Custom cursor
 */

//Styles
import styles from "./DotRing.module.scss";

//Hooks
import useMousePosition from "../../hooks/useMousePosition";
import useTraductor from "@/features/multiLang/hooks/useTraductor";

/**
 * Custom cursor
 * @returns 
 */
const DotRing = ({label}:{label:string}) => {
  const{getTextStringTraduction} =useTraductor()
  const labelConverted = getTextStringTraduction(label)
  const {mousePosition:{ x, y }, isMoving} = useMousePosition();
  return (
    <>
      <div
        className={[styles.dot, isMoving  ? styles.isMoving : styles.notMoving ].join(" ")}
        style={{ left: `${x}px`, top: `${y}px` }}
      > <div className={[styles.round,isMoving ? styles.isMoving : styles.notMoving].join(" ")}><span className={styles.label} dangerouslySetInnerHTML={{__html:labelConverted}}/> </div></div>
    </>
  );
};

export default DotRing;
