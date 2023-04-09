import { GlobalContainer } from '@/components/atoms/container/GlobalContainer/GlobalContainer';
import { PageContent } from '@/features/pagecontent/components/PageContent/PageContent';
import { IInitialData, IPageData, getInitialData, getPageData } from '@/utils/initializePage.utils';
import React from 'react'

//GSAP - Initialization
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SEO from '@/features/seo/components/SEO';
import usePage from '@/hook/usePage';
import Initializer from '@/components/Initializer/Initializer';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Newsletter from '@/features/newsletter/components/Newsletter/Newsletter';
import { IStore } from '@/redux/rootReducer';
import { useSelector } from 'react-redux';
import styles from './maintenance.module.scss'
import LogoSite from '@/components/molecules/LogoSite/LogoSite';
import MultiLangBtn from '@/features/multiLang/components/MultiLangBtn/MultiLangBtn';

gsap.registerPlugin(ScrollTrigger);
const GOOGLE_CAPTCHA_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;

const mapState = (state: IStore) => ({
  newletter: state.newsletter
})

const LogoHeader = () => {
  return (
    <div className={styles.global_container_header}>
      <>
      <div className={[styles.col,styles.col0].join(" ")}> <div className={styles.wrapper_btn_lang}></div></div>
        <div className={[styles.col,styles.col1].join(" ")}></div>
        <div className={[styles.col,styles.col2].join(" ")}></div>
        <div className={[styles.col,styles.col4].join(" ")}><div className={styles.logo_container}><LogoSite color={'black'}/></div></div>
      </>
    </div>
  )
}
const NewsletterMaintenance = () => {

  const {newletter:{settings:{maintenance_label_btn, title_maintenance}}} =useSelector( mapState)
  return ( <Newsletter labelBtn={maintenance_label_btn && maintenance_label_btn!== ""?maintenance_label_btn:'FR=Être notifié|EN=Be Notified'} centerBtn={true} message={title_maintenance && title_maintenance!== ""?title_maintenance:'FR=Soyez notifié|EN= Be Notified'}/>)
}
function Maintenance({
    dataPage,
    initialData,
  }: {
    dataPage: IPageData | null;
    initialData: IInitialData;
  }) {

  
  

  return (
    <>
    <Initializer  intialData={initialData}/>
    {dataPage ?
    <>
    <SEO title='Maintenance'/>
    <GlobalContainer padding={false}>
    <LogoHeader/> 
    {dataPage.content && (
      <>
      <PageContent listContent={dataPage.content} gsap={gsap} />
      <div style={{height:'200px'}}/>
      </>

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

        </GoogleReCaptchaProvider>
      }
          <NewsletterMaintenance />
    </GlobalContainer>

    </>
  :
  <>
    <SEO title={'FR=En maintenance, Nous revenons bientôt|EN=Maintenance Mode, We will come back soon'}/>
  <h1>Maintenance Mode, the website is not available. Please, come back later</h1>
  </>
  }
  </>
  )
}

export default Maintenance

export async function getStaticProps() {
    //Getting general settings
    const initialData = await getInitialData();
  
    //Getting id home page from general settings
    const idMaintenance = initialData.generalSettings.maintenance_mode.page_maintenance_id;

    const dataPage = idMaintenance && Number(idMaintenance)>0? await getPageData(idMaintenance) : null;
  
    return {
      props: {
        initialData,
        dataPage,
      },
      revalidate: 60,
    };
  }