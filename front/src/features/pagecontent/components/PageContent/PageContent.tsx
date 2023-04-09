/*=============================================
=        PAGE CONTENT COMPONENTS                =
=============================================*/
/**
 * Display all the content from a page data
 */

//Utils
import { IPageContentBloc } from "@/utils/initializePage.utils";

//Components
import { withPageContentContainer } from "./PageContentContainer";

/**
 * Page content View
 * @param param0 listContent: data from the server , gsap object for annimation
 * @returns 
 */
export const PageContent = ({listContent, gsap}: {listContent: IPageContentBloc[], gsap: any }) => {
    if(!listContent){
        return <></>
    }
    const WithContainer = withPageContentContainer(listContent, gsap)
    return <WithContainer/>
}
