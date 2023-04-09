/*=============================================
=        HOME IMAGE PRODUCT BLOC         =
=============================================*/
/**
 * Style component displaying home image product section
 */

//Libraries
import { FC } from "react";

//Types
import { BlocProps } from "../type";

//Components
import ImageBloc from "@/components/atoms/ImageBloc/ImageBloc";
import ProductListStatic from "@/components/molecules/ProductListStatic/ProductList";

//Styles
import styles from "./HomeImageProduct.module.scss";
import { useHomeImagePorductAnnimation } from "./useHomeImageProductAnnimation";
import DotRing from "@/features/customCursor/components/DotRing/DotRing";
import Link from "next/link";

/**
 *  Styled component displaying home image product section
 * @param param0 
 * @returns 
 */
export const HomeImageProduct: FC<BlocProps> = ({ content, gsap }) => {
  const { image1, product_list, product_btn_label } = content;
  const {imageRef, productListRef} = useHomeImagePorductAnnimation(gsap)
  return (
    <section className={styles.global_container}>
      <div className={styles.global_content}>

        <div ref={imageRef}className={styles.image_wrapper}
        
        >

          <ImageBloc image={image1} objectFit={"contain"} />
        </div>

        <div className={styles.product_wrapper}>

    
        <div ref={productListRef} className={styles.product_list_wrapper}>
          {product_list &&
          <>
            <ProductListStatic listProduct={product_list} cardSize={'small'} labelBtn={product_btn_label? product_btn_label: 'voir'} />
            <div className={styles.gap}/>
            </>
          }
        </div>
 

        </div>
      </div>
    </section>
  );
};
