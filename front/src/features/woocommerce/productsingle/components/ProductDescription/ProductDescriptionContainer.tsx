/*=============================================
=       Product Description Container     =
=============================================*/
/**
 * Display product description
 * */

//Libaries
import React, { FC } from "react";

//Hooks
import { useSingleProduct } from "../../hooks/useSingleProduct";
import useTraductor from "@/features/multiLang/hooks/useTraductor";

/*=============================================
=       Types  =
=============================================*/
export interface DescriptionViewProps {
  description: string;
}

/*=============================================
=       Container    =
=============================================*/
/**
 * Single Product Descrption Container
 * give the description of the single product
 * @param DescriptionContainer
 * @returns
 */
export default function withProductDescriptionContainer(
  DescriptionContainer: FC<DescriptionViewProps>
) {
  return function Container() {
    
    const { description } = useSingleProduct(null, false);
    const { getTextObjectTraduction } = useTraductor();
    const descriptionConverted = description
      ? getTextObjectTraduction(description)
      : "";
    
    if(descriptionConverted && descriptionConverted !== "" ){
    return <DescriptionContainer description={descriptionConverted} />;
    }else{
      return <></>;
    }
  };
}
