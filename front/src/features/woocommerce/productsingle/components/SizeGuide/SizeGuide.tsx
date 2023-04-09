import useTraductor from '@/features/multiLang/hooks/useTraductor'
import React, { useState } from 'react'
import { useSingleProduct } from '../../hooks/useSingleProduct'
import { IImageJSON } from '@/features/woocommerce/types'
import { useTranstionDisplayComponents } from '@/hook/useTransitionDisplayComponent';
import ImageBloc from '@/components/atoms/ImageBloc/ImageBloc';
import styles from './SizeGuide.module.scss'
import ReactDOM from "react-dom"

export const ImageModal = ({image, isWillBeKilledCompponent,handleClose}:{image: IImageJSON |null, isWillBeKilledCompponent: boolean, handleClose: () => void}) => {
    const portal = document.getElementById('portal-modal-sizeguide')
    if(portal){
    return ReactDOM.createPortal(
        <div className={[styles.modal_global_container,isWillBeKilledCompponent ? styles.show : styles.hide ].join(" ")}>
            <div className={styles.btn_close_wrapper} onClick= {() => {
                handleClose()
            }}> <img className={styles.icon_close}src={'/icon-cross-white.svg'} alt={'close icon'}/> </div>
            {
                image &&
                <div className={styles.image_wrapper}>
                <ImageBloc image={image} objectFit={'contain'}/>
                </div>
            }
        </div>
    ,portal)
    }else{
        return (<></>)
    }
}
function SizeGuide() {
    const [isShowModalImage,setShowModalImage ] = useState(false);
    const  {isWillBeKilledCompponent, isKilledComponent}= useTranstionDisplayComponents(!isShowModalImage, 300)
    const {getTextStringTraduction, getTextObjectTraduction} =useTraductor()
    const label = getTextStringTraduction('FR=Guide des tailles|EN=Size Guide')
    const {size_guide} = useSingleProduct(null, false)
    const imageBylang : IImageJSON | null = size_guide ? getTextObjectTraduction(size_guide) : null

    const handleOpenModal = () => {
        setShowModalImage(true)
        console.log('open')
    }
    const handleCloseModal = () => {
        setShowModalImage(false)
        console.log('close')
    }
  return (
    <>
    {size_guide &&
        <>
      <span className={styles.size_guide_btn} onClick= {() => {
        handleOpenModal()
      }}dangerouslySetInnerHTML={{__html:label}}/>
      {
       isShowModalImage && 
        <ImageModal
        image = {imageBylang}
        isWillBeKilledCompponent={isWillBeKilledCompponent}
        handleClose = {handleCloseModal}
        />
    }
      </>
    }

    </>
  )
}

export default SizeGuide
