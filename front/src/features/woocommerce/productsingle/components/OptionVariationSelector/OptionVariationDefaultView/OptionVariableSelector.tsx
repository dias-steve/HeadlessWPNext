import React, { FC } from "react";

import styles from "./OptionVariableSelector.module.scss";

import {withContainer } from "../_optionVariationSelector.func";
import { BtnOptionProps, BtnOptionThumnailProps, OptionVariableSelectorViewProps, SingleVariationListOptionViewProps } from "../../../types";


/*==========================================================================
=             PRESENTATIONAL COMPONENT  For Option VariableSelector        =
============================================================================*/

/**
 *
 * Btn option presentational
 * */
export const BtnOption  : FC<BtnOptionProps> = ({ checked, available, label, handleClick } :BtnOptionProps ) =>  {
  return (
    <button
      className={[
        styles.option_btn,
        checked ? styles.selected : "",
        available ? "" : styles.option_not_available,
      ].join(" ")}
      onClick={(e) => {
        handleClick(e);
      }}
    >
      {label}
    </button>
  );
}

/**
 *
 * Btn option with thumnail
 * */
export const BtnOptionThumnail: FC<BtnOptionThumnailProps> = ({
  checked,
  available,
  label,
  handleClick,
  thumnail,
}: BtnOptionThumnailProps) => {
  return (
    <button
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
      {label}
    </button>
  );
}

/**
 *
 * Variables list Option Row
 * */
export const SingleVariationListOptionView : FC<SingleVariationListOptionViewProps> = ({ children, title } :SingleVariationListOptionViewProps) =>{
  return (
    <div>
      <span>{title} </span>
      {children}
    </div>
  );
}

/**
 * Global Selctor
 *
 * */
export const OptionVariableSelectorView : FC<OptionVariableSelectorViewProps> = ({children} :OptionVariableSelectorViewProps) => {
  return (
    <div className={styles.global_container_selector}>
      <span>Selector Option</span>
      {children}
    </div>
  );
}



export default withContainer(OptionVariableSelectorView,SingleVariationListOptionView,BtnOption,BtnOptionThumnail)
