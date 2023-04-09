/*=============================================
=        OPTION MODAL Container       =
=============================================*/
/**
 * Mount and unMount the filter product modal
 */


//Library
import { useSwipeable } from "react-swipeable";
import useCart from "@/features/woocommerce/cart/hooks/useCart";
import useTraductor from "@/features/multiLang/hooks/useTraductor";
import { useTranstionDisplayComponents } from "@/hook/useTransitionDisplayComponent";
import { vocalubary } from "@/utils/vocabulary";
import { FC, useState } from "react";
import { useSingleProduct } from "../../hooks/useSingleProduct";

/*=============================================
=        OPTION TYPES     =
=============================================*/

export interface OpenBtnProps {
  isWillBeKilled: boolean;
  onClickOpenModal: () => void;
  label: string;
  available: boolean;
  alreadyInCartMessage: string;
  waiting: boolean;
  addedLabel : string;
}

export interface ModalProps {
  isWillBeKilled: boolean;
  onCloseModal: () => void;
  label: string;
  handlers: any;
}

/**
 * Option Product Container
 * @param Modal
 * @param ButtonOpen
 * @returns
 */
export const withOptionModalContainer = (
  Modal: FC<ModalProps>,
  ButtonOpen: FC<OpenBtnProps>,

) => {
  return function Container() {


    const [isHideModal, setIsHideModal] = useState(true);
    const {
      isKilledComponent: isModalKilled,
      isWillBeKilledCompponent: isModalWillBeKilled,
    } = useTranstionDisplayComponents(!isHideModal, 400);
    const {
      isKilledComponent: isButtonKilled,
      isWillBeKilledCompponent: isButtonWillBeKilled,
    } = useTranstionDisplayComponents(isHideModal, 400);

    const {product_is_variable} = useSingleProduct(null, false);
    const{getBtnAddToCartProps, isProductIndividualInCart } = useCart()


    const {available, handleClick} = getBtnAddToCartProps
    const { getTextStringTraduction, getTextObjectTraduction } = useTraductor();
    const label_is_already_in_cart = getTextObjectTraduction(vocalubary.item_already_in_the_cart);
    const alreadyInCartMessage = !product_is_variable && isProductIndividualInCart ? label_is_already_in_cart: ''
    const [waiting, setWaiting] = useState(false)
    const onCloseModal = () => {
      setIsHideModal(true);
    };

    const onOpenModalOrAddtoCart = () => {
      
      if (product_is_variable){
        setIsHideModal(false);
      }else{
        if (available){
          handleClick();
          setWaiting(true); setTimeout(() => {setWaiting(false)}, 2000)
        }


      }

    };
    const addedLabel = getTextObjectTraduction(vocalubary.added_to_the_cart);

          // Swipeable
  const handlers = useSwipeable({
    onSwipedDown: () =>  setIsHideModal(true),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true
  });
    const label = getTextObjectTraduction(vocalubary.add_to_card);
    const availableBtn = product_is_variable ? true : available
    return (
      <>
        {!isModalKilled &&(
          <Modal
            isWillBeKilled={isModalWillBeKilled}
            onCloseModal={onCloseModal}
            label={label }
            handlers={handlers}
          />
        )}
        {!isButtonKilled &&(
          <ButtonOpen
            isWillBeKilled={isButtonWillBeKilled}
            onClickOpenModal={onOpenModalOrAddtoCart }
            label={label}
            available={availableBtn}
            alreadyInCartMessage= { alreadyInCartMessage}
            waiting = { waiting }
            addedLabel = {addedLabel }

          />
        )}
      </>
    );
  };
};
