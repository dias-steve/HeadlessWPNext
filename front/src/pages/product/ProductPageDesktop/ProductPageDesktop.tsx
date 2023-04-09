/*=============================================
=       Single Product Page Desktop          =
=============================================*/
/**
 * Display the Single Product Page Desktop
 * When the screen width is greater than 768px
 */

//Liberies
import React, { useEffect } from "react";

//Style
import styles from "./ProductPageDesktop.module.scss";

//Components
import SnapContainer from "@/components/atoms/SnapContainer/SnapContainer";
import {
  GlobalContainer,
  GlobalContent,
} from "@/components/atoms/container/GlobalContainer/GlobalContainer";
import { Footer } from "@/features/nav/components/Nav/Footer/Footer";
import SingleProduct from "@/features/woocommerce/productsingle/components";
import OptionDestop from "@/features/woocommerce/productsingle/components/OptionDesktop/OptionDesktop";
import { useIntersection } from "@/hook/useIntersection";
import { useProductPageAnnimation } from "./ProductPageAnnimation";
import Nav from "@/features/nav/components/Nav/Nav";
import { useNav } from "@/features/nav/hook/useNav";


/**
 * Product Page Component for Desktop Mode
 * @returns 
 */
function ProductPageDesktop({gsap}: {gsap: any}) {
  //const[element, isVisible] = useIntersection(() => {}, true)
  const {galleryRef, productInfoRef, optionRef} = useProductPageAnnimation(gsap)

  const {setIsEnableGeneralScrollListener} = useNav();
  useEffect(() => {
    setIsEnableGeneralScrollListener(false);
  },[])
  return (
    <>
        <Nav />
      <SnapContainer>
        <GlobalContainer padding={false}>
          <GlobalContent>
            <div ref={galleryRef} >
            <SingleProduct.Gallery />
            </div>
            <div  className={styles.landmark}/>
            <div className={[styles.productInfoFixedContainer, !true ? styles.hide : styles.show].join(" ")}>
              <div ref={productInfoRef}className={styles.productInfoWrapper}>
                <SingleProduct.ProductInfo />
              </div>
            </div>
            
            <div  className={[styles.option_wrapper, !true ? styles.hide : styles.show].join(" ")}>
            <div  ref={optionRef}>
              <OptionDestop />
            </div>
            </div>
            <SingleProduct.UpSellProductList/>


          </GlobalContent>
        </GlobalContainer>
        <div className={styles.footerwrapper}>
        <Footer />
        </div>
      </SnapContainer>
    </>
  );
}

export default ProductPageDesktop;
