/*===================================================================
=         Container List Cart                                         =
====================================================================*/

import { FC, ReactNode, useEffect, useState } from "react";
import { IProductCart, IProductCartCardProps } from "../../types";

import { v4 as uuidv4 } from "uuid";

import { addToCartAction, removeToCartAction } from "../../redux/cart.reducer";
import { IStore } from "@/redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { vocalubary } from "@/utils/vocabulary";
import useTraductor from "@/features/multiLang/hooks/useTraductor";
import useCart from "../../hooks/useCart";

const mapState = (state: IStore) => ({
  cart: state.cart,
});

export interface NoItemViewProps {
  message: string
}

/**
 *
 * @param Wrapper  : The wrapper of the item list
 * @param ProductCartCard : The view of a item of the list
 * @param NoItemsInCart : the View displayed when the list is empty
 * @param readOnly : block access to edit list items
 * @returns : Fonctionnal component
 */
export const withContainer = (
  Wrapper: FC<{ children: ReactNode }>,
  ProductCartCard: FC<IProductCartCardProps>,
  NoItemsInCart: FC<NoItemViewProps >,
  readOnly: boolean
) => {
  /**
   *
   * @param props : item : ProductCart
   * @returns : Fonctionnal component
   */
  const ProductCartCardContainer = ({ item }: { item: IProductCart }) => {
    const [isDisplayMessage, setIsDisplayMessage] = useState(false);
    const { cart } = useSelector(mapState);
    const itemsStockErrorMatrix = cart.itemsStockErrorMatrix;
    const dispatch = useDispatch();
    const id = item.product.id;
    const productData = item.product;
    const { name: nameraw, title_displayed, images_gallery, price, regular_price, link, on_sale, id_parent,  variation_name_display, thumbnail } =
      productData;
    const image = (thumbnail && thumbnail.url ) ? thumbnail : images_gallery && (images_gallery[1] ||images_gallery[0] );
    const isReadOnly = readOnly;
    const haveError = itemsStockErrorMatrix?.[id] ? true : false;
    let message = "";
    const {getTextObjectTraduction, getTextStringTraduction}=useTraductor()
    const name = getTextStringTraduction(title_displayed && title_displayed !== "" && title_displayed !== " " ? title_displayed : nameraw)
    

    const maxQuantity =  itemsStockErrorMatrix?.[id] ? 
      itemsStockErrorMatrix?.[id]?.code_error === 20 && 
      itemsStockErrorMatrix?.[id]?.stock_quantity &&
      itemsStockErrorMatrix?.[id]?.stock_quantity
    : false;
    if (haveError) {
      const error = itemsStockErrorMatrix?.[id];
      const messageErrorFormated = error.code_error === 10
      ?  getTextObjectTraduction(vocalubary.not_in_stock)
      : getTextObjectTraduction(vocalubary.quantity_limited_to) +' '+error.stock_quantity;
      message = messageErrorFormated
     

    }

   
    const handleClickDelete = () => {
      dispatch(removeToCartAction({ product: item.product, quantity: 100000000 }));
    };

    const haveMoreQuatity = () => {
      if(haveError && itemsStockErrorMatrix?.[id] &&  itemsStockErrorMatrix?.[id].code_error === 10){
        return false;
      }
      if(!item.product.sold_individualy && (!maxQuantity || maxQuantity > item.quantity)  ){
        return true;
      }else{
        return false;
      }
    }

    const haveLessQuatity = () => {
      if(haveError && itemsStockErrorMatrix?.[id] &&  itemsStockErrorMatrix?.[id].code_error === 10){
        return false;
      }
      if( item.quantity > 1 ){
        return true;
      }else{
    
        return false
      }

    }
    const handleAddQuantity = () => {
      if(haveMoreQuatity()){
        dispatch(addToCartAction({ product: item.product, quantity: 1 }));
      }
    }

    const handleRemoveQuantity = () => {
      if(haveLessQuatity() ){

        dispatch(removeToCartAction({ product: item.product, quantity: 1 }));

      }

    }

    useEffect(() => {
     
      if(haveError && maxQuantity && maxQuantity >= item.quantity){
        setIsDisplayMessage(false)
      }else{
        setIsDisplayMessage(true)
      }
    },[item.quantity])




    return (
      <ProductCartCard
        title={name}
        price={price}
        regularPrice={regular_price}
        image={image}
        link={'/product/'+id_parent}
        onSale={on_sale}
        quantity={item.quantity}
        messageError={isDisplayMessage ? message : ""}
        handleClickDelete={handleClickDelete}
        handleClickMoreQuantity={handleAddQuantity}
        handleClickLessQuantity={handleRemoveQuantity}
        showMoreBtn={haveMoreQuatity()}
        showLessBtn={haveLessQuatity()}
        isReadOnly={isReadOnly}
        removeLabel={getTextObjectTraduction(vocalubary.remove)}
        quantityLabel={getTextObjectTraduction(vocalubary.quantity)}
        variationNameList={variation_name_display}
      />
    );
  };

  /**
   * Wrapper Component
   */
  return function Container() {
    const { cart } = useSelector(mapState);
    const {getTextStringTraduction} = useTraductor();
    const message = getTextStringTraduction('FR=Aucun article dans le panier|EN=No items in the cart')
    const listProduct: IProductCart[] | null = readOnly
      ? cart.listItemsValidated
      : cart.listItems;

    return (
      <Wrapper>
        {listProduct && listProduct.length > 0 ? (
          listProduct.map((item) => (
            <ProductCartCardContainer key={uuidv4()} item={item} />
          ))
        ) : (
          <NoItemsInCart message={message} />
        )}
      </Wrapper>
    );
  };
};
