import React, { FC } from "react";
import styles from "./ProductSortbyPrice.module.scss";

import { withContainer } from "./_productSortbyPrice.func";
import { BtnProps, WrapperProps } from "../../../types";

/*===================================================================
=            VIEW COMPONENT PRODUCT SORT PRICE     =
====================================================================*/

/**
 * Component that display button for options
 * @param {*} param0
 * @returns
 */

export const Btn: FC<BtnProps> = ({
  label,
  checked,
  handleClick,
}: BtnProps) => {
  return (
    <button
      className={[styles.btn, checked ? styles.btn_active : ""].join(" ")}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
    >
      {label}
    </button>
  );
};

/**
 * Component that display button option list wrapper
 * @param {*} param0
 * @returns
 */
export const WrapperViewSortWrapper: FC<WrapperProps> = ({
  children,
}: WrapperProps) => {
  return (
    <div>
      price
      {children}
    </div>
  );
};

export default withContainer(WrapperViewSortWrapper, Btn);
