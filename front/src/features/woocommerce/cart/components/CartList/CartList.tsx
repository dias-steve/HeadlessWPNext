/*===================================================================
=         Presentational Components  Cart List                               =
====================================================================*/

import React, { FC, ReactNode } from "react";
import { IProductCartCardProps } from "../../types";
import { NoItemViewProps, withContainer } from "./_cartListfunct";
import { v4 as uuidv4 } from "uuid";
import styles from "./CartList.module.scss";
import ImageBloc from "@/components/atoms/ImageBloc/ImageBloc";
import Link from "next/link";
import useTraductor from "@/features/multiLang/hooks/useTraductor";

/**
 * Wrapper of the list item
 * @param props : children = list of item in the cart
 * @returns
 */

export const CartListWrapper: FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <div className={styles.global_container_wrapper}>{children}</div>;
};

/**
 *
 * View of individual list items
 * @param
 * @returns
 */
export const ProductCartCard: FC<IProductCartCardProps> = ({
  title,
  image,
  link,
  quantity,
  price,
  regularPrice,
  onSale,
  messageError,
  handleClickDelete,
  handleClickMoreQuantity,
  handleClickLessQuantity,
  showMoreBtn,
  showLessBtn,
  isReadOnly,
  removeLabel,
  quantityLabel,
  variationNameList,
}: IProductCartCardProps) => {

  const {getTextStringTraduction} = useTraductor()
  
  return (
    <div className={styles.global_container_product_card_cart}>

      <div className={styles.image_product_wrapper}>
        {  messageError && messageError !== "" && messageError !== " " &&
          <img className={styles.error_icon} alt={'error'} src={'/error.svg'}/>
        }
        { image && image.url &&
        <Link href={link}><ImageBloc image={image} objectFit={'fill'}/></Link>
        }
      </div>

      <div className={styles.info_product_wrapper}>
      <span className={styles.error_message}>{messageError}</span>
      <Link href={link}><h2 className= {styles.title_card}dangerouslySetInnerHTML={{__html:title}}/></Link>
  
      <h3 className={styles.price}> {price}€ </h3>
      {
         variationNameList && Array.isArray(variationNameList) &&
         <div className={styles.attribut_wrapper}>
         {
         variationNameList.map((variation, index) => {
          const {variation_key:{label}, variation_value:{name: nameValue}} = variation
          return(
            <div  key={uuidv4()} className={styles.attribut_item}>
              <h3 className={styles.label}>{index >= 1 && ',   '}{getTextStringTraduction(label)}: <span>{getTextStringTraduction(nameValue)}</span></h3>
            </div>
     
          )
         })}
         </div>
      }
      <h3 className={styles.quantity}>{quantityLabel}: <span>{quantity}</span></h3>

      
    
      {!isReadOnly && (
        <div
          className={[styles.btn, styles.delete_btn].join(" ")}
          onClick={(e) => {
            e.preventDefault();
            handleClickDelete();
          }}
        >
              <img alt={'close'}
                    src={'/icon-cross.svg'}
                />
        </div>

        
      )}
      {
        !isReadOnly && showLessBtn &&
        <span
        className={styles.btn}
        onClick={(e) => {
          e.preventDefault();
          handleClickLessQuantity()
        }}
      >
        -
      </span>
      }
      {
        !isReadOnly && showMoreBtn &&
        <span
        className={styles.btn}
        onClick={(e) => {
          e.preventDefault();
          handleClickMoreQuantity();
        }}
      >
        +
      </span>
      }
      </div>


    </div>
  );
};

/**
 * No Item View : Is displayed in case of empty cart
 * @returns  Fonctional Component
 */
export const NoItemsInCart: FC<NoItemViewProps > = ({message}) => {
  return <span className={styles.no_item_in_cart_message}>{message}</span>;
};

/**
 * Compoent Container with editable items list
 */
export const CartList = withContainer(
  CartListWrapper,
  ProductCartCard,
  NoItemsInCart,
  false
);

/**
 * Compoent Container with no editable items list
 */
export const ReadOnlyListItemCartValidated = withContainer(
  CartListWrapper,
  ProductCartCard,
  NoItemsInCart,
  true
);

export default CartList;
