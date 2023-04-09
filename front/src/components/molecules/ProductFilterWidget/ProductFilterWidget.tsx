/*=============================================
=       Product Filter Widget  PRESENTATIONAL COMPONENTS  =
=============================================*/
/**
 * Filter widget 
 * Show the product Categpries
 */ 

//Libraries
import React, { Children, FC, ReactNode, useState } from 'react';

//Styles
import styles from './ProductFilterWidget.module.scss';

//Container
import { withProductFilterContainer } from './ProductFilterContainer';

//Components
import ProductFilter from '@/features/woocommerce/productlist/components/ProductFilter';
import { useFilter } from '@/features/woocommerce/productlist/components/hook/useFilter';
import useTraductor from '@/features/multiLang/hooks/useTraductor';


/**
 * Categorie Button components display by the mobal
 * @param param0
 * @returns 
 */
export function BtnCategory({checked, label, handleClick}:{checked: boolean, label: string, handleClick: any} ){

    const labelFormat : string = checked ? label+' [X]' : label;
    return(
        <div className={[styles.btn_category_container, checked? styles.checked : ''].join(" ")} onClick = {e=>{handleClick(e)}}>
           <span dangerouslySetInnerHTML={{__html:  labelFormat}}/>
        </div>
    )
}

/**
 * Wrapper list Categories 
 * 
 * @param param0 isItWillChange: is a flag to indicate the list categories changing, for CSS annimation
 * @returns 
 */
export function WrapperListCategories  ({children, isItWillChange}: {children: ReactNode, isItWillChange: boolean}){
    return (<div className={[styles.categorie_list_wrapper,isItWillChange ? styles.itWillChange : "" ].join(" ")}>
        {children}
    </div>)
}

/**
 * Product Filter Widget Modal
 * Display the modal witch content all filters
 * @param param0 
 * @returns 
 */
export const ProductFilterWidgetModal: FC<{isWillBeKilled: boolean, onCloseModal: () => void, displayBackBtn : boolean,  nameParent:string,   setProductCatParentBack: () => void}> = ({
    isWillBeKilled,
    onCloseModal,
    displayBackBtn,
    nameParent,
    setProductCatParentBack

}) => {

    const {getTextStringTraduction} = useTraductor()
    const labelback = getTextStringTraduction('FR=Retour|EN=Go Back')
    const labelclose = getTextStringTraduction('FR=Fermer|EN=Close')

    
    
    
  return (
    <div  className={[styles.global_container_modal,isWillBeKilled ? styles.hide :  styles.show ].join(" ")}>
              <div className={styles.title_wrapper}>
                <span className={styles.title}> Catégorie:{nameParent}</span>
              </div>
        <div className={styles.categorie_list_wrapper}>
            <ProductFilter.Categorie/>
        </div>
     

        <div className={styles.close_wrappper_btn}>

        {displayBackBtn &&
<BtnCategory checked={false} label={labelback} handleClick={(e : any) => {
        e.preventDefault();
        setProductCatParentBack();
        
    }} />}
            <BtnCategory checked={false} label={labelclose} handleClick={(e : any) => {
        e.preventDefault();
        onCloseModal();
        
    }} />
    </div>
        </div>
           
  
  )
}

/**
 * Button Open Widget
 * 
 * Handle de openning of the modal filters
 * 
 * @param param0 
 * @returns 
 */
export const ButtonOpenFilterWidget: FC<{isWillBeKilled: boolean, onClickOpenModal: () => void}> = ({
    isWillBeKilled,
    onClickOpenModal,
})=>{

    const {getTextStringTraduction} = useTraductor()
    const label = getTextStringTraduction('FR=Filtre|EN=Filter')
    return(
        <div onClick={(e) => {
            e.preventDefault();
            onClickOpenModal();
        }}
        className={[styles.btn_open_container,isWillBeKilled ? styles.hide :  styles.show ].join(" ")}
        >
            <span dangerouslySetInnerHTML={{__html: label}}/>
        </div>
    )
}

/**
 * Container 
 * Contain the modal Button 
 * @returns 
 */
export const Container = () => {
    const ModalButton = withProductFilterContainer(ButtonOpenFilterWidget, ProductFilterWidgetModal)
    return (
        <div className={styles.global_container}>
            <ModalButton/>
        </div>
    )
}

export default Container
