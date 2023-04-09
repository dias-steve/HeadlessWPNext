/*=============================================
=       Product Info    =
=============================================*/

//Library
import React from "react";

//Container
import ProductDescriptionCustom from "../ProductDescription/ProductDescriptionCustom/ProductDescriptionCustom";

//Components
import Price  from "../ProductPrice/ProductPrice";
import { TitleContainer } from "../ProductTitle/ProdudtTitleContainer";

//Styles
import styles from "./ProductInfo.module.scss";
import ProductHTMLSupl from "../ProductHTMLSupl/ProductHTMLSupl";
import SizeGuide from "../SizeGuide/SizeGuide";

/**
 * Product Info
 *
 * Display all important information about the single product
 * such as the title, description, price, on sale, on stock
 * size guide
 * @returns
 */
export default function ProductInfo() {
  return (
    <section className={styles.global_container_info}>
      <div className={styles.title_price_wrapper}>
        <h1 className={styles.title}>
          <TitleContainer />
        </h1>
        <span className={styles.price_from}>
          <Price.PriceFrom /><br/>
        </span>
        <span className={styles.price}>
          <Price.Price />
        </span>
        <span className={styles.regular_price}>
          <Price.RegularPrice />
        </span>
        <span className={styles.not_avalaible}>
          <Price.ProductNotAvailable />
        </span>
        <span className={styles.sold_individualy}>
          <Price.ProductSoldIndividually/>
        </span>
      </div>

      <ProductDescriptionCustom />
      <div className={styles.size_guide_wrapper}>
      <SizeGuide/>
      </div>
      <div className={styles.general_information_wrapper}>
      <ProductHTMLSupl/>
      </div>

    </section>
  );
}
