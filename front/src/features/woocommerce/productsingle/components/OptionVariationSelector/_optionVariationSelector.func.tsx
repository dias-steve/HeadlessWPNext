import React, { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { setVariationSelectedStart } from "../../redux/singleproduct.reducer";
import { BtnOptionProps,OptionVariableSelectorViewProps, SingleVariationContainerProps, SingleVariationListOptionViewProps, BtnOptionThumnailProps } from "../../types";
import { IStore } from "@/redux/rootReducer";
import { IListVartionsItem } from "@/features/woocommerce/types";
import useTraductor from "@/features/multiLang/hooks/useTraductor";

const mapState = (state : IStore) => ({
  singleProduct: state.singleproduct,
});

/*=============================================
=            CONTAINER COMPONENT          =
=============================================*/

export function withContainer(
  WrapperViewContainer : FC<OptionVariableSelectorViewProps>,
  VariationsListWrapperView: FC<SingleVariationListOptionViewProps>,
  VariationItem: FC<BtnOptionProps>,
  VariationItemThumnail: FC<BtnOptionThumnailProps>
) {
  /**
   *
   * Fonctional container for Option BTN
   * */
  function BtnValueContainer({ name, variation_key }: {name: string, variation_key: string}) {
    const { singleProduct } = useSelector(mapState);
    const {
      variations_selected,
      variations_stock_status,
      variation_list_detail,
    } = singleProduct;

    const isSelected = variations_selected?.[variation_key] === name;
    const isAvailable = variations_stock_status?.[variation_key]?.[name];
    const label =
      variation_list_detail?.[variation_key]?.[name]?.["name"] || name;
    const thumnail =
      variation_list_detail?.[variation_key]?.[name]?.thumnail || false;

    const dispatch = useDispatch();

    const{getTextStringTraduction} = useTraductor()
    const handleClick = (e: any) => {
      e.preventDefault();
      if (true){//isAvailable){//) {
        dispatch(setVariationSelectedStart({ [variation_key]: name }));
      }
    };

    if (thumnail) {
      return (
        <VariationItemThumnail
          checked={isSelected}
          available={isAvailable}
          handleClick={handleClick}
          label={getTextStringTraduction(label)}
          thumnail={thumnail}
        />
      );
    } else {
      return (
        <VariationItem
          checked={isSelected}
          available={isAvailable}
          handleClick={handleClick}
          label={getTextStringTraduction(label)}
        />
      );
    }
  }

  /**
   *
   * Fonctional container for Single varaition row
   * */
  const SingleVariationContainer :FC<SingleVariationContainerProps> = ({ variation } : SingleVariationContainerProps) => {
    const {
      variation_name,
      variation_key,
      termes: { termes_names },
    } = variation;

    const {singleProduct:{variation_list_detail_v2}}= useSelector(mapState)
    const name = variation_list_detail_v2 && variation_list_detail_v2[variation_key]?.label ||  variation_name
    const {getTextStringTraduction} =useTraductor()
    return (
      <VariationsListWrapperView title={getTextStringTraduction(name)}>
        {termes_names.map((name) => (
          <BtnValueContainer
            key={uuidv4()}
            name={name}
            variation_key={variation_key}
          />
        ))}
      </VariationsListWrapperView>
    );
  }

  /**
   *
   *
   * Principal return
   */
  return function OptionVariableSelectorContainer() {
    const { singleProduct } = useSelector(mapState);
    const { list_variations, product_parent } = singleProduct;

    return (
      <>{
        product_parent.product_is_variable &&
      <WrapperViewContainer>
        {list_variations.map((variation: IListVartionsItem) => (
          <SingleVariationContainer key={uuidv4()} variation={variation} />
        ))}
      </WrapperViewContainer>
  }
      </>
    );
  };
}
