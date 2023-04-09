/*=============================================
=        SNAP CONTAINER         =
=============================================*/
/**
 * Snap container
 * afford the snap for global screen
 */

//Liberies
import React, { ReactNode, useEffect, useRef } from "react";

//Styles
import styles from "./SnapContainer.module.scss";
//hooks
import { useScrollListenerNav } from "@/features/nav/hook/useScrollListenerNav";

/**
 * Container for snap scroll y
 * @param param0 child component with spna css setled
 * @returns 
 */
function SnapContainer({ children }: { children: ReactNode }) {
  const { handleScrollElement } = useScrollListenerNav(false);
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    ref.current?.scrollTo(0,0)
    ref.current?.scrollIntoView(false);
  },[])
  return (
    <div   ref={ref}  onScroll={handleScrollElement} className={styles.global_container}>
      {children}
    </div>
  );
}

export default SnapContainer;
