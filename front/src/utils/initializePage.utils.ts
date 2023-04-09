
/*=============================================
=           IntializzePage          =
=============================================*/
/**
 * Call in the server side
 */

import { IJSONReponseRGPDSettings } from "@/features/PopupRGPD/types";
import { InewsLetterStoreType } from "@/features/newsletter/redux/newsLetterSlice";
import { IProductJSON } from "@/features/woocommerce/types";

/*=============================================
=          Types          =
=============================================*/
export interface ISettingsWebSiteResponse {
    logo_src: false| string,
    url_front: false|string,
    name_site: false|string,
    homepage_id_page: string | null,
    copyright: false|string,
    maintenance_mode: {
        is_activated: boolean,
        page_maintenance_id: string | null
    },
    languages_supported_list: null | string[]
}

// menu
export interface menuChild {
    term_id: number,
    name: string,
    parent: number,
    link: string,
    slug: string,
    description:string,
    thumbnail: {
        url: false | string,
        alt: false | string,
    },
    have_childs: boolean,
    post_type: string, // custom or page or orther
    id_post: string
}

export interface menuItem {
    name: string;
    childrens: menuChild[];
}

export interface IMenuResponse {
    [keyMenu: string]: menuItem
}


export interface IInitialData {
    generalSettings: ISettingsWebSiteResponse;
    menus : IMenuResponse;
    newletterSettings: INewletterSettingsResponse;
}

export interface IPageContentBloc {
    bloc_type: string;
    image1: { url: string, alt: string};
    image2: { url: string, alt: string};
    product_list: false | IProductJSON[]
    link_type: false | "none" |"woocommerce_cat"|"woocommerce_product"|"page"|"extern_link";
    extern_link: false | string,
    product_link: false| string;
    product_cat_link: false | string;
    page_link: false | string;
    product_btn_label: false | string
    label_main_btn : false | string;
    link_1: false | string;
    title_1: false | string;
    image_gallery: {url:string, alt: false| string}[]
    content_supl: false | any;
    editor_content: false | {[langKey:string]:string}
}
export interface ISEO{
  title_seo: null | string,
  meta_description_seo: string ,
  other_data_seo: null | any
}

export interface IPageData {
    id: number,
    title: string,
    thumbnail: {
        url: false | string,
        alt: false | string
    },
    content: null | IPageContentBloc[],
    desactivated_page: null | boolean,
    link:string,
    seo: ISEO
}

export interface INewletterSettingsResponse {
  url_form_mailchip: string | false,
  title: string | false
}




/*=============================================
=          fucntion          =
=============================================*/

/**
 * Getting the page data from the  server
 * @param idPage Page id
 * @returns 
 */
export const getPageData  = async (idPage: string | number) => {

  const pageData = await fetch(
    process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/pages/"+idPage,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  ).then(response => response.json());
  //Getting generalSettings

return pageData

}

export const getDataFromBackend = async (route: string) =>{
  const data = await fetch(
    process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + route,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  ).then(response => response.json());
  return data;
}


export interface IInitialData {
  generalSettings:ISettingsWebSiteResponse ,
  menus :IMenuResponse ,
  newletterSettings:INewletterSettingsResponse,
  rgpd :  IJSONReponseRGPDSettings
}
export const getInitialData  = async ()  => {

  //Getting generalSettings
 const generalSettings : ISettingsWebSiteResponse = await fetch(
  process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/settings",
  {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }
).then(response => response.json());


  //Getting Menu
  const menus : IMenuResponse = await fetch(
    process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/menus",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  ).then(response => response.json());


  //Getting RGPD Settings

  const rgpd : IJSONReponseRGPDSettings = await getDataFromBackend('/rgpd')


  const newletterSettings : INewletterSettingsResponse = await getDataFromBackend('/newsletter/settings')

return {
  generalSettings,
  menus,
  newletterSettings,
  rgpd
} 

}