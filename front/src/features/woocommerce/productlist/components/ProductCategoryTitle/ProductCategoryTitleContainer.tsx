/*=============================================
=        Product Title Container  =
=============================================*/
/**
 * Title Catgorie component
 */

//Hook
import useTraductor from "@/features/multiLang/hooks/useTraductor"

//Reducer
import { IStore } from "@/redux/rootReducer"

//Libraries
import { FC } from "react"
import { useSelector } from "react-redux"

/*=============================================
=       Types  =
=============================================*/
export interface TitleViewProps {
    title: string
}

//Mapstates
const mapState = (state: IStore) => ({
    category : state.productlist.category_page_info
})

/*=============================================
=        Product Title Container  =
=============================================*/
/**
 * Product Category Title Container
 * @param TitleView Title Category View
 * @returns 
 */
export const withProductCategoryTitleContainer = (TitleView: FC<TitleViewProps>) => {
    return function Container(){
        const {category: {description}} = useSelector(mapState)
        const {getTextStringTraduction} = useTraductor()
        if(description && description !== ""){
            const title = getTextStringTraduction(description)
            return (
                <TitleView title={title}/>
            )
        }else{
            return <></>
        }
    }
}