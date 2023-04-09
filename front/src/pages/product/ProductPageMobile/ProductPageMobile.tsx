/*=============================================
=       Single Product Page Mobile          =
=============================================*/
/**
 * Display the Single Product Page Desktop
 * When the screen width is smaller than 768px
 */

//Libraries
import React from "react";

//Components
import {
  GlobalContainer,
  GlobalContent,
} from "@/components/atoms/container/GlobalContainer/GlobalContainer";
import { Footer } from "@/features/nav/components/Nav/Footer/Footer";
import SingleProduct from "@/features/woocommerce/productsingle/components";
import OptionModal from "@/features/woocommerce/productsingle/components/OptionModal/OptionModal";
import OptionDesktop from "@/features/woocommerce/productsingle/components/OptionDesktop/OptionDesktop";
import styles from './ProductPageModile.module.scss'
import { useIntersection } from "@/hook/useIntersection";
import Nav from "@/features/nav/components/Nav/Nav";

const OptionsAddTocart = () => {
  const[element, isVisible] = useIntersection(() => {}, true)
  return (
    <div className={styles.global_container}>
          <div className={[styles.wrapperModal,  isVisible? styles.hide : styles.show].join(" ")}>
          <OptionModal/>
          </div>

          <div className={[styles.optionContainer].join(" ")}>
          <div className={[styles.wrapperOption].join(" ")}>
          <div ref={element} className={styles.OptionDesktopWrapper}>
          <OptionDesktop/>
          </div>
          </div>
          </div>
    </div>
  )
}
export default function ProductPageMobile({gsap}: {gsap: any}) {

  return (
    <>
        <Nav />
      <GlobalContainer padding={false}>
        <SingleProduct.Gallery />
        <GlobalContent>
          <SingleProduct.ProductInfo />
          <OptionsAddTocart/>
        </GlobalContent>
      </GlobalContainer>
      <SingleProduct.UpSellProductList/>
      <Footer />
    </>
  );
}
