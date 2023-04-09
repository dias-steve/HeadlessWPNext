/*=============================================
=        Nav Desktop             =
=============================================*/
/**
 * Navigateur for desktop mode
 */

//Components
import CartIcon from '@/features/woocommerce/cart/components/CartIcon/CartIcon';
import MenuItem from '../../MenuItem/MenuItem';
import LogoSite from '@/components/molecules/LogoSite/LogoSite';

//Style
import styles from './NavDesktop.module.scss';
import useTraductor from '@/features/multiLang/hooks/useTraductor';
import MultiLangBtn from '@/features/multiLang/components/MultiLangBtn/MultiLangBtn';

/**
 * Navigateur for desktop mode
 * @returns Navigation Component for desktop mode
 */
export const NavDesktop = () => {

    return (
  
      <div className={[styles.global_container].join(" ")}>
    
        <>
        <div className={[styles.col,styles.col0].join(" ")}><CartIcon/> <div className={styles.wrapper_btn_lang}><MultiLangBtn/></div></div>
        <div className={[styles.col,styles.col1].join(" ")}><MenuItem menuId ="menu_header_sec_2"/></div>
        <div className={[styles.col,styles.col2].join(" ")}><MenuItem menuId ="menu_header_sec_1"/></div>
        <div className={[styles.col,styles.col4].join(" ")}><div className={styles.logo_container}><LogoSite color={'black'}/></div></div>
        </>
  
      </div>
    );
  };
export default NavDesktop;