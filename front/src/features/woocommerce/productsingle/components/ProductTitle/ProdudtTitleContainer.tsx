/*=============================================
=       Product Title Container    =
=============================================*/
/**
 * Display the title of the product
 */

//Hooks
import useTraductor from "@/features/multiLang/hooks/useTraductor";
import { useSingleProduct } from "../../hooks/useSingleProduct";

/**
 * Title Container
 * Display the title of the single product
 * @returns
 */
export const TitleContainer = () => {
  const { title_displayed } = useSingleProduct(null, false);
  const { getTextStringTraduction } = useTraductor();
  if (title_displayed) {
    return <>{getTextStringTraduction(title_displayed)}</>;
  } else {
    return <></>;
  }
};
