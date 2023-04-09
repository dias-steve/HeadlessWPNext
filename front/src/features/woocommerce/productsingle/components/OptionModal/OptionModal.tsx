/*=============================================
=        OPTION MODAL Presentational Container      =
=============================================*/
/**
 * All Presentationakl Container
 */


//Styles
import styles from "./OptionModal.module.scss";

//Hooks
import useCart from "@/features/woocommerce/cart/hooks/useCart";

//Component
import BtnPrimary from "@/components/atoms/btn/BtnPrimary/BtnPrimary";
import SingleProduct from "..";


//Container
import {
  ModalProps,
  OpenBtnProps,
  withOptionModalContainer,
} from "./OptionModalContainer";
import useTraductor from "@/features/multiLang/hooks/useTraductor";
import { vocalubary } from "@/utils/vocabulary";
import { useState } from "react";


/**
 * Close Modal Button 
 * @param param0 
 * @returns 
 */
export const CloseBtn = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      className={styles.btn_close_global_container}
      onClick={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <img
        className={styles.arrow_icon}
        src={"/arrow-down.svg"}
        alt={"icon arrow down"}
      />
    </div>
  );
};

/**
 * Modal displaying the options
 * @param param0 
 * @returns 
 */
export const ModalOptionView = ({
  isWillBeKilled,
  onCloseModal,
  label,
  handlers
}: ModalProps) => {
  const { getBtnAddToCartProps:{available, handleClick} , isProductIndividualInCart } = useCart();
  const {getTextObjectTraduction} = useTraductor();
  const label_is_already_in_cart = getTextObjectTraduction(vocalubary.item_already_in_the_cart);
  const [waiting, setWaiting] = useState(false)
  const added = getTextObjectTraduction(vocalubary.added_to_the_cart);
  return (
    <div
      className={[
        styles.modal_global_container,
        isWillBeKilled ? styles.hide : styles.show,
      ].join(" ")}
      {...handlers}
    >
      <CloseBtn onClose={onCloseModal} />
      <SingleProduct.OptionVariableSelector />
      <div style={{height: '38px', width:'100%', borderRadius: '16px'}} className={[styles.btn_add_to_cart_wrapper, waiting? styles.show_added : '' ].join(" ")}> 
            {waiting ? <span className={styles.added_to_the_cart_message}>{added}</span>:<>
            <BtnPrimary link={null} label= {label} available={available} handleClick={() => { available && handleClick(); setWaiting(true); setTimeout(() => {setWaiting(false)}, 2000)}} withClose={false} grayColor={false} style={{height: '40px', width:'100%', borderRadius: '16px'}}
          handleClickClose={null}/>
            {isProductIndividualInCart && <p className={styles.already_in_cart_text}>{label_is_already_in_cart}</p>}
            </>
            }
            </div>  
    </div>
  );
};

/**
 * Button Open Modal
 */
export const BtnOpenModal = ({
  isWillBeKilled,
  onClickOpenModal,
  label,
  available,
  alreadyInCartMessage,
  waiting,
  addedLabel
}: OpenBtnProps) => {


  return (
    <div  style={{height: '38px', borderRadius: '16px'}}
      className={[
        styles.btn_open_global_container,
        isWillBeKilled ? styles.hide : styles.show, waiting? styles.show_added : ''
      ].join(" ")}

    >
      {waiting ? <span className={styles.added_to_the_cart_message}>{addedLabel}</span>:<>
      <BtnPrimary
        link={null}
        label={label}
        handleClick={(e) => {
          available && 
          e.preventDefault();
          onClickOpenModal();
        }}
        available={available}
        withClose={false}
        grayColor={false}
    
        handleClickClose={null}
        style={{ height: "40px", width: "100%", borderRadius: "16px" }}
      />
        <p className={styles.already_in_cart_text}>{ alreadyInCartMessage}</p>
        </>}
    </div>
  );
};

export default withOptionModalContainer(ModalOptionView, BtnOpenModal);




