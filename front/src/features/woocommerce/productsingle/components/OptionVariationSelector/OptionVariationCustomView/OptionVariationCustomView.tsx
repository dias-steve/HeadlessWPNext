import React, { FC } from "react";

import styles from "./OptionVariationCustomView.module.scss";


import { BtnOptionProps, BtnOptionThumnailProps, OptionVariableSelectorViewProps, SingleVariationListOptionViewProps } from "../../../types";
import { withContainer } from "../_optionVariationSelector.func";
import ImageBloc from "@/components/atoms/ImageBloc/ImageBloc";


/*==========================================================================
=             PRESENTATIONAL COMPONENT  For Option VariableSelector        =
============================================================================*/

/**
 *
 * Btn option presentational
 * */
export const BtnOptionCustomView  : FC<BtnOptionProps> = ({ checked, available, label, handleClick } :BtnOptionProps ) =>  {
  return (
    <div
      className={[
        styles.option_btn,
        checked ? styles.selected : "",
        available ? "" : styles.option_not_available,
      ].join(" ")}
      onClick={(e) => {
        handleClick(e);
      }}
    >
      <span className={styles.label}> <div className={styles.dash}/>{label}</span>
    </div>
  );
}

/**
 *
 * Btn option with thumnail
 * */
export const BtnOptionThumnailCustomView: FC<BtnOptionThumnailProps> = ({
  checked,
  available,
  label,
  handleClick,
  thumnail,
}: BtnOptionThumnailProps) => {
  return (
    <div
      className={[
        styles.option_btn,
        checked ? styles.selected : "",
        available ? "" : styles.option_not_available,
        styles.with_thumnail,
      ].join(" ")}
      
      onClick={(e) => {
        handleClick(e);
      }}
    >


      <div className={styles.thumnail_wrapper}>
        <ImageBloc image={thumnail} objectFit={'cover'} />

      </div>
    </div>
  );
}

/**
 *
 * Variables list Option Row
 * */
export const SingleVariationListOptionCustomView : FC<SingleVariationListOptionViewProps> = ({ children, title } :SingleVariationListOptionViewProps) =>{
  return (
    <div className={styles.single_variation_row_global_container}>
      <span className={styles.title}>{title} </span>
      <div className={styles.btn_option_wrapper}>
      {children}
      </div>
    </div>
  );
}

/**
 * Global Selctor
 *
 * */
export const OptionVariableSelectorCustomView  : FC<OptionVariableSelectorViewProps> = ({children} :OptionVariableSelectorViewProps) => {
  return (
    <div className={styles.global_container_selector}>
      {children}
    </div>
  );
}

export default withContainer( OptionVariableSelectorCustomView ,SingleVariationListOptionCustomView,BtnOptionCustomView ,BtnOptionThumnailCustomView)