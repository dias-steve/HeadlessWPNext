/*=============================================
=            PRODUCT CATEGORY PAGE      =
=============================================*/
/**
 * Page displays the list of products from the specified category
 */

//Components
import ProductList from "@/features/woocommerce/productlist/components/ProductList/ProductList";

//Hooks
import { useFilter } from "@/features/woocommerce/productlist/components/hook/useFilter";
import usePage from "@/hook/usePage";
import { useIntersection } from "@/hook/useIntersection";

//Components
import {
  GlobalContainer,
  GlobalContent,
} from "@/components/atoms/container/GlobalContainer/GlobalContainer";
import {
  IInitialData,
  getDataFromBackend,
  getInitialData,
} from "@/utils/initializePage.utils";
import ProductFilterWidget from "@/components/molecules/ProductFilterWidget/ProductFilterWidget";
import { Footer } from "@/features/nav/components/Nav/Footer/Footer";
import ProductCategoryTitle from "@/features/woocommerce/productlist/components/ProductCategoryTitle/ProductCategoryTitle";
import ProductCategoryImage from "@/features/woocommerce/productlist/components/ProductCategorieImage/ProductCategoryImage";
import Nav from "@/features/nav/components/Nav/Nav";
import ProductListPagination from "@/features/woocommerce/productlist/components/ProductListPagination/ProductListPagination";

//types
import { IcategorieDataJSON } from "@/features/woocommerce/productlist/types";

//styles
import styles from "./ProductCategory.module.scss";
import ProductCategorySEO from "@/features/woocommerce/productlist/components/ProductCategorySEO/ProductCategorySEO";

/**
 * Product Category Page 
 * @param param0 
 * @returns 
 */
export const ProductCategoryPage = ({
  initialData,
  productCategoriesList,
}: {
  initialData: IInitialData;
  productCategoriesList: IcategorieDataJSON;
}) => {
  useFilter(productCategoriesList);

  const [element, isVisible] = useIntersection(() => {}, true);
  usePage(initialData, false, true);

  return (
    <>
    <ProductCategorySEO/>
      <Nav />
      <GlobalContainer padding={true}>
        <ProductCategoryImage />
        <GlobalContent>
        <ProductCategoryTitle />
        </GlobalContent>
        <GlobalContent>
          <div>
            <div className={styles.product_list_wrapper}>
              <ProductList />
            </div>
            <div className={styles.paginations_wrapper}>
              <ProductListPagination />
            </div>
            <div ref={element} className={styles.landmark} />
            <div
              className={[
                styles.filter_wrapper,
                isVisible ? styles.hide : styles.show,
              ].join(" ")}
            >
              <ProductFilterWidget />
            </div>
          </div>
        </GlobalContent>
      </GlobalContainer>
      <Footer />
    </>
  );
};

export default ProductCategoryPage;

/*=============================================
=     BACKEND         =
=============================================*/
export async function getStaticProps() {
  //Getting general settings

  const initialData: any = await getInitialData();
  const productCategoriesList: IcategorieDataJSON = await getDataFromBackend(
    "/products/categories"
  );
  return {
    props: {
      initialData,
      productCategoriesList,
    },
    revalidate: 60,
  };
}
