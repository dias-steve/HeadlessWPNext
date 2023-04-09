/*=============================================
=       PAGE            =
=============================================*/
/**
 * Display page 
 */

//Libraries
import { GetStaticPaths, GetStaticProps } from 'next'
import { v4 as uuidv4 } from "uuid";

//Utils
import { IInitialData,  IPageData,  getInitialData, getPageData } from "@/utils/initializePage.utils";

//Hook
import usePage from "@/hook/usePage";

//Components
import { PageContent } from "@/features/pagecontent/components/PageContent/PageContent";

//gsap
import gsap from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { Footer } from '@/features/nav/components/Nav/Footer/Footer';
import Nav from '@/features/nav/components/Nav/Nav';
import SEO from '@/features/seo/components/SEO';
gsap.registerPlugin(ScrollTrigger);

export default  function Page({ dataPage,  initialData  }: { dataPage:IPageData, initialData:IInitialData}) {

  usePage( initialData, false, true )

  return (
    <>
      
    <SEO seoData={dataPage.seo}/>
    <Nav />
    <div style={{minHeight:'80vh'}}>

      {
      dataPage.content &&
      <PageContent listContent={dataPage.content} gsap={gsap}/>
      }
     

    </div>
    <Footer />

    </>
  );
}


export  const getStaticProps: GetStaticProps = async (context: any) => {
    const id = context.params.page;
    const dataPage =  await getPageData(id);

    const initialData :  any = await getInitialData()

    return {
      props: {
        dataPage,
        initialData,
        key: uuidv4(),
      },
      revalidate: 30,
    };
  }


export const getStaticPaths: GetStaticPaths = async () => {
    const data = await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/pages",
      {
        // Adding method type
        method: "GET",
  
        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }

    );
  
    const pages : {id: string}[] = await data.json();
  
    

    const paths = pages.map((item : any) => ({
      params: { page: item.id.toString() },
    }));
  
    return {
      paths,
      fallback: true,
    };
  }
