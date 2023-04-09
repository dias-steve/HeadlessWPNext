/*=============================================
=        SWITCH CONTENT BLOC           =
=============================================*/
/**
 * Block Content Switcher for display the right content
 */

//Utils
import { HomeHero } from "@/components/bloc/HomeHero/HomeHero"
import { HomeImageProduct } from "@/components/bloc/HomeImageProduct/HomeImageProduct"
import { HomeInstagramFeed } from "@/components/bloc/HomeInstagramFeed/HomeInstagramFeed"
import HomeTowProducts from "@/components/bloc/HomeTowProducts/HomeTowProducts"
import LookbookFeed from "@/components/bloc/LookbookFeed/LookbookFeed"
import TextEditor from "@/components/bloc/TextEditor/TextEditor"
import { IPageContentBloc } from "@/utils/initializePage.utils"
//Type
import { FC } from "react"

/**
 * Display the right component content Bloc
 * 
 * @param contentBloc bloc data from the page data
 * @returns component content Bloc 
 */
export const switchContentBlocManager = (contentBloc : IPageContentBloc, gsap: any) : FC=> {
    return function Bloc (){
        switch (contentBloc.bloc_type){
            case 'home-hero': 
                return <HomeHero content={contentBloc} gsap={gsap}/>
            case 'home-product-image': 
                return <HomeImageProduct  content={contentBloc}  gsap={gsap} />

            case 'tow-product':
                return <HomeTowProducts content={contentBloc}  gsap={gsap} />

            case 'home-lookbook': 
                return <HomeInstagramFeed content={contentBloc}  gsap={gsap} />
            case 'lookbookBloc-imagelist':
                return <LookbookFeed content={contentBloc} gsap={gsap}/>
            case 'text_editor' :
                return <TextEditor content={contentBloc} gsap={gsap}/>
            default : 
                return <p>{contentBloc.bloc_type} : unknow</p>
        }
    }
}

export default switchContentBlocManager