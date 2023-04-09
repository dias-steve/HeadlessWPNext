/*=============================================
=            SINGLE PRODUCT TYPES     =
=============================================*/

import { ReactNode } from "react";
import { IImageJSON, IListVartionsItem } from "../types";



export interface BtnOptionProps {
    checked: boolean;
    available: boolean;
    label: string;
    handleClick: any;
  }



  export interface BtnOptionThumnailProps extends BtnOptionProps{
    thumnail: IImageJSON
  }

  export interface SingleVariationListOptionViewProps {
    children: ReactNode,
    title: string
  }

  export interface OptionVariableSelectorViewProps {
    children: ReactNode,
  
  }

  export interface SingleVariationContainerProps{
    variation: IListVartionsItem
  }