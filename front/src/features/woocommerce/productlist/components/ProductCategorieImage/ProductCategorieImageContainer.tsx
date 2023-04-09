/*=============================================
=        Product Categorie Image Container   =
=============================================*/
/**
 * Show the image of the category
 */

//Libraries
import { IStore } from "@/redux/rootReducer"
import { FC } from "react"
import { useSelector } from "react-redux"

/*=============================================
=        Type  =
=============================================*/
export interface ImageviewProps {
    image:{url: string , alt: string}
}

//MapState
const mapState = (state: IStore) => ({
    category : state.productlist.category_page_info
})

/**
 * Show the image of the category page
 * @param ImageView Image view 
 * @returns 
 */
export const withProductCatgorieImageContainer = (ImageView:FC<ImageviewProps> ) => {
    
    return function Container(){
        const {category: {thumbnail}} = useSelector(mapState)
        if(thumbnail.url && thumbnail.url !== "" ){
            return (<ImageView image={{url:thumbnail.url, alt: thumbnail.alt||"" }}/>)
        }else{
            return(<></>)
        }

    }
}

export default withProductCatgorieImageContainer;