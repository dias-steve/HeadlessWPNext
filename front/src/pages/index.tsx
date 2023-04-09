/*=============================================
=       HOME PAGE            =
=============================================*/
/**
 * Display the home page
 */

//Hooks
import usePage from "@/hook/usePage";

//utils
import {
  IInitialData,
  IPageData,
  getInitialData,
  getPageData,
} from "@/utils/initializePage.utils";

//Component
import { PageContent } from "@/features/pagecontent/components/PageContent/PageContent";
import { Footer } from "@/features/nav/components/Nav/Footer/Footer";
import Nav from "@/features/nav/components/Nav/Nav";
import { GlobalContainer } from "@/components/atoms/container/GlobalContainer/GlobalContainer";

//Style
import styles from "../styles/Home.module.scss";


//GSAP - Initialization
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Newsletter from "@/features/newsletter/components/Newsletter/Newsletter";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Initializer from "@/components/Initializer/Initializer";
import SEO from "@/features/seo/components/SEO";

gsap.registerPlugin(ScrollTrigger);
const GOOGLE_CAPTCHA_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;
/**
 * Home page component
 * @param param0
 * @returns
 */
export default function Home({
  dataPage,
  initialData,
}: {
  dataPage: IPageData;
  initialData: IInitialData;
}) {




  //RENDING
  return (
    <>
      <Initializer  intialData={initialData}/>
      <SEO seoData={dataPage.seo}/>
      <Nav />
      <GlobalContainer padding={false}>
        {dataPage.content && (
          <PageContent listContent={dataPage.content} gsap={gsap} />
        )}
        { GOOGLE_CAPTCHA_KEY !== undefined &&
        <GoogleReCaptchaProvider
                reCaptchaKey={ GOOGLE_CAPTCHA_KEY}
                scriptProps={{
                  async: false,
                  defer: false,
                  appendTo: "head",
                  nonce: undefined,
                }}
              >
        <Newsletter />
        </GoogleReCaptchaProvider>
      }
        <Footer />
      </GlobalContainer>
    </>
  );
}

export async function getStaticProps() {
  //Getting general settings
  const initialData: any = await getInitialData();

  //Getting id home page from general settings
  const idHomePage = initialData.generalSettings.homepage_id_page;
  const dataPage = await getPageData(idHomePage);

  return {
    props: {
      initialData,
      dataPage,
    },
    revalidate: 60,
  };
}
