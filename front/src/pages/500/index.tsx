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
import useTraductor from '@/features/multiLang/hooks/useTraductor';
import Link from 'next/link';
gsap.registerPlugin(ScrollTrigger);

export default  function Index({ initialData  }: { dataPage:IPageData, initialData:IInitialData}) {

  usePage( initialData, false, true )
  const {getTextStringTraduction}=useTraductor()
    const styles = {

    }
  const title = getTextStringTraduction('FR=Oops, une erreur|EN=Oops, a error occurred')
  const label = getTextStringTraduction('FR=Retourner à l&#39;accueil|EN=Go back to the home')
  return (
    <>
    <SEO title={'FR=FR=Oops, une erreur|EN=Oops, a error occurred'}/>
    <Nav />
    <div style={{ 
        minHeight:'80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
        
        }}>

        <h1 style={{
            fontSize: 'clamp(30px, 5vw, 100px)'
        }}>{title}</h1>

        <Link href='/'>
            <span style={{
                cursor: 'pointer',
                textDecoration: 'underline'
            }} dangerouslySetInnerHTML={{__html:label}}/>

        </Link>

    </div>
    <Footer />

    </>
  );
}


export  const getStaticProps: GetStaticProps = async (context: any) => {


    const initialData :  any = await getInitialData()

    return {
      props: {
        initialData,
        key: uuidv4(),
      },
      revalidate: 30,
    };
  }


