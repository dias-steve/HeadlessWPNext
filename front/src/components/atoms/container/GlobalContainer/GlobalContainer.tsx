/*=============================================
=        GLOBAL CONTAINER     =
=============================================*/
/**
 * Container div with the css settings
 */

//Libraries
import { ReactNode } from "react";

//Styles
import styles from "./GlobalContainer.module.scss";

/**
 * Global container
 *
 * @param param0 children: child components, pading: adding padding to the top
 * @returns
 */
export const GlobalContainer = ({
  children,
  padding,
}: {
  children: ReactNode;
  padding: boolean;
}) => {
  return (
    <div
      id={"smooth-wrapper"}
      className={[
        styles.global_container,
        padding ? styles.addPadding : "",
      ].join(" ")}
    >
      {children}
    </div>
  );
};
/**
 * Global Content
 * @param param0 children: child components
 * @returns
 */
export const GlobalContent = ({ children }: { children: ReactNode }) => {
  return (
    <div id={"smooth-content"} className={styles.global_content}>
      {children}
    </div>
  );
};
