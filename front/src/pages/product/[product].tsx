/*=============================================
=       Single Product Page           =
=============================================*/
/**
 * Display the Single Product Page
 */

//Libraries
import React from "react";
import { v4 as uuidv4 } from "uuid";

//Types
import { GetStaticProps, GetStaticPaths } from "next";
import { ISingleProductFetchResult } from "@/redux/type";

//Hooks
import usePage from "@/hook/usePage";
import { useSingleProduct } from "@/features/woocommerce/productsingle/hooks/useSingleProduct";
import { useMedia } from "@/hook/useMedia";

//Utils
import {
  IInitialData,
  getDataFromBackend,
  getInitialData,
} from "@/utils/initializePage.utils";

//Components
import ProductPageMobile from "./ProductPageMobile/ProductPageMobile";
import ProductPageDesktop from "./ProductPageDesktop/ProductPageDesktop";
import ImageViewer from "@/features/ImageViewer/components/ImageViewer";


//GSAP - Initialization
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SEO from "@/features/seo/components/SEO";
import { IProductJSON } from "@/features/woocommerce/types";
/**
 * Single Product Page
 * @param param0
 * @returns Single Product Component
 */
const Product = ({
  product,
  initialData,
}: {
  product: {data:IProductJSON};
  initialData: IInitialData;
}) => {
  //Initialisation

  //Breakpoints
  const matches = useMedia("(max-width: 768px)");
  usePage(initialData, false, matches);
  const { data: parentproduct } = product;
  useSingleProduct(parentproduct, true);

  return (
    <>
      <div id='portal-modal-sizeguide'/>
      {parentproduct.seo &&
        <SEO seoData={parentproduct.seo}/>
      }
      {!matches ? (
        <>
          <ImageViewer />
          <ProductPageDesktop gsap={gsap} />
        </>
      ) : (
        <>
          <ProductPageMobile gsap={gsap} />
        </>
      )}
    </>
  );
};
export default Product;

/*=============================================
=     BACKEND         =
=============================================*/
export const getStaticProps: GetStaticProps = async (context: any) => {
  const id = context.params.product;

  const data = await getDataFromBackend("/products/" + id);
  const initialData: any = await getInitialData();

  return {
    props: {
      product: data,
      initialData,
      key: uuidv4(),
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products: ISingleProductFetchResult = await getDataFromBackend(
    "/products"
  );

  const paths = products.data.result.map((item) => ({
    params: { product: item.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};
