/*=============================================
=        Main Footer         =
=============================================*/
/**
 * main footer
 */

//Styles
import styles from './Footer.module.scss';

//Components
import MenuItem from '../../MenuItem/MenuItem';


/**
 * Footer use for the product page
 * @returns 
 */
export const Footer = () => {
    return (
          
      <div className={[styles.global_container].join(" ")}>
    
   
      <div className={styles.global_content}>
      <div className={[styles.col,styles.col0].join(" ")}><MenuItem menuId ="footer_sec_2"/></div>
      <div className={[styles.col,styles.col1].join(" ")}><MenuItem menuId ="footer_sec_3"/></div>
      <div className={[styles.col,styles.col2].join(" ")}><MenuItem menuId ="footer_sec_4"/></div>
      <div className={[styles.col,styles.col4].join(" ")}><MenuItem menuId ="footer_sec_1"/></div>
      </div>


    </div>
    )
}

/**
 * Footer Main use 
 * @returns 
 */
export const FooterNaked = () => {
  return (
        
    <div className={styles.global_content_naked}>
    <div className={[styles.col,styles.col0].join(" ")}><MenuItem menuId ="footer_sec_2"/></div>
    <div className={[styles.col,styles.col1].join(" ")}><MenuItem menuId ="footer_sec_3"/></div>
    <div className={[styles.col,styles.col2].join(" ")}><MenuItem menuId ="footer_sec_4"/></div>
    <div className={[styles.col,styles.col4].join(" ")}><MenuItem menuId ="footer_sec_1"/></div>
    </div>
  )
}

