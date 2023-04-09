/*=============================================
=        Nav Mobile            =
=============================================*/
/**
 * Navigateur for mobile mode
 */

//Components
import LogoSite from "@/components/molecules/LogoSite/LogoSite";
import CartIcon from "@/features/woocommerce/cart/components/CartIcon/CartIcon";
import MenuBurgerBtn from "./MenuBurgerBtn/MenuBurgerBtn";

//Style
import styles from "./NavMobile.module.scss";
import MultiLangBtn from "@/features/multiLang/components/MultiLangBtn/MultiLangBtn";

/**
 * Navigateur for mobile mode
 * 
 * @returns Navigateur for mobile mode
 */
export const NavMobile = () => {
  return (
    <div className={styles.global_container}>
      <div className={styles.btn_container}>
        <div className={[styles.icon ,styles.menu_burger_wrapper].join(" ")}>
          <MenuBurgerBtn />
        </div>
        <div className={[styles.icon ,styles.cart_icon_wrapper].join(" ")}>
          <CartIcon />
        </div>
        <div className={styles.wrapper_btn_lang}><MultiLangBtn/></div>
      </div>
      <div className={styles.logo_icon_wrapper}>
        <LogoSite color={"black"} />
      </div>
    </div>
  );
};

export default NavMobile;
