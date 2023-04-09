/*=============================================
=        FILTER MODAL Container       =
=============================================*/
/**
 * Mount and unMount the filter product modal
 */

//Libraries
import React, { FC, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

//Reducer
import { setCategoriesParentBackAction } from '@/features/woocommerce/productlist/redux/productList.reducer';
import { IStore } from '@/redux/rootReducer';

//Hooks
import useTraductor from '@/features/multiLang/hooks/useTraductor';
import { useTranstionDisplayComponents } from '@/hook/useTransitionDisplayComponent';

//Mapstate
const mapState = (state: IStore) =>({
    categoriesSelected: state.productlist.product_categories_selected,
    productList: state.productlist
})

/**
 * Product list filter modal container 
 * @param ButtonOpenFilter Open modal button
 * @param ModalFilter Modal component 
 * @returns 
 */
export const withProductFilterContainer = (ButtonOpenFilter: FC<{isWillBeKilled: boolean, onClickOpenModal: () => void}>, ModalFilter: FC<{isWillBeKilled: boolean, onCloseModal: () => void, displayBackBtn:boolean, nameParent: string,   setProductCatParentBack: () => void}>) => {

    return function Container(){

        const dispatch = useDispatch()
        const [isHideModal, setIsHideModal] = useState(true);
        const {isKilledComponent : isModalKilled, isWillBeKilledCompponent : isModalWillBeKilled} = useTranstionDisplayComponents(!isHideModal, 400)
        const {isKilledComponent : isButtonKilled, isWillBeKilledCompponent : isButtonWillBeKilled} = useTranstionDisplayComponents(isHideModal, 400)

        const {categoriesSelected, productList} = useSelector(mapState);
        const {product_categories_selected:{parentId, nameParent}} =productList
        const onCloseModal = () => {
            setIsHideModal(true);
        }

        const onOpenModal = () => {
            setIsHideModal(false);
        }

        

        const displayBackBtn =  categoriesSelected?.listCategoriesSelected?.length > 0 &&
        Number(categoriesSelected?.listCategoriesSelected[0].parent) !== Number(productList.idCategoryOrigin)  ? true : false

        const{getTextStringTraduction}=useTraductor()

        const setParentBack = () => {
            dispatch(
                setCategoriesParentBackAction()
            )
        }
        
        return (
                <>{ categoriesSelected && categoriesSelected.listCategoriesSelected.length > 0 &&
                    <>
                    {!isModalKilled && <ModalFilter isWillBeKilled={isModalWillBeKilled}  onCloseModal={onCloseModal} displayBackBtn={displayBackBtn} nameParent={getTextStringTraduction(nameParent)} setProductCatParentBack={setParentBack}/>}
                    {!isButtonKilled && <ButtonOpenFilter isWillBeKilled={ isButtonWillBeKilled} onClickOpenModal={onOpenModal}/> }
                    </>
                    }
                </>
            )
    }
}


