/*=============================================
=        Product Categorie Title Presentation Container  =
=============================================*/
/**
 * Titlle Catgorie component
 */

//Libraries
import React from "react";

//Container
import {
  TitleViewProps,
  withProductCategoryTitleContainer,
} from "./ProductCategoryTitleContainer";

//Styles
import styles from "./ProductCategoryTitle.module.scss";

/**
 * Product Category Title page component
 * @param param0
 * @returns
 */
function ProductCategoryTitle({ title }: TitleViewProps) {
  return (
    <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
  );
}

export default withProductCategoryTitleContainer(ProductCategoryTitle);
