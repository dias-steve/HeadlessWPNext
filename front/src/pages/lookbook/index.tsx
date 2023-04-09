/*=============================================
=       PAGE LOOKBOOK            =
=============================================*/
/**
 * Display Main LOOKBOOK Page
 */

//Libraries
import { GetStaticPaths, GetStaticProps } from "next";
import { v4 as uuidv4 } from "uuid";

//Utils
import {
  IInitialData,
  IPageData,
  getDataFromBackend,
  getInitialData,
  getPageData,
} from "@/utils/initializePage.utils";

//Hook
import usePage from "@/hook/usePage";

//gsap
import gsap from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { Footer } from "@/features/nav/components/Nav/Footer/Footer";
import { ILookbook } from "@/features/lookbook/types";
import { LookbookGallery } from "@/features/lookbook/components/LookbookGallery/LookbookGallery";
import AnimatedPage from "@/layouts/AnimatedPage/AnimatedPage";
import Nav from "@/features/nav/components/Nav/Nav";
import SEO from "@/features/seo/components/SEO";
gsap.registerPlugin(ScrollTrigger);

export default function Index({
  dataPage,
  initialData,
}: {
  dataPage: ILookbook;
  initialData: IInitialData;
}) {
  usePage(initialData, true, true);
  const { gallery, label_main_btn_lookbook, link_main_btn_lookbook } = dataPage;

  return (
    <>
      <SEO seoData={dataPage.seo}/>
      <Nav />
      <AnimatedPage exitHome={false}>
        <LookbookGallery
          imageGallery={gallery}
          padding={true}
          labelBtn={label_main_btn_lookbook || null}
          linkBtn={link_main_btn_lookbook || null}
          counter={21}
        />
      </AnimatedPage>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  //Getting general settings
  const initialData: any = await getInitialData();

  //Getting id home page from general settings

  const dataPage = await getDataFromBackend("/lookbooks/main");

  return {
    props: {
      initialData,
      dataPage,
    },
    revalidate: 60,
  };
}
