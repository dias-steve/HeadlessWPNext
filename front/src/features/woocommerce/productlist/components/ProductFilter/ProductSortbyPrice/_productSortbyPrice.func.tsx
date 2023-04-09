import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { setSortFilterAction } from "../../../redux/productList.reducer"; 
import { BtnProps, ISortPayload, WrapperProps } from "../../../types";

/*===================================================================
=            FONCTIONAL CONTAINER COMPONENT PRODUCT SORT PRICE     =
====================================================================*/

/**
 * Component fonctional manage button sorting
 * @param {*} param0
 * @returns
 */

export const withContainer = (
  WrapperView: FC<WrapperProps>,
  BtnView: FC<BtnProps>
) => {
  return function Container() {
    const [btnASCActive, setBtnASCActive] = useState("unactive");
    const dispatch = useDispatch();

    const conevertStateToFilterSortValue = (
      btnState: string
    ): boolean | null => {
      switch (btnState) {
        case "unactive":
          return null;
        case "asc":
          return true;
        case "desc":
          return false;

        default:
          return null;
      }
    };
    const payloadSort: ISortPayload = {
      key: "price",
      isASC: conevertStateToFilterSortValue(btnASCActive),
    };

    const handleClick = (value: string) => {
      if (btnASCActive === value) {
        setBtnASCActive("unactive");
      } else {
        setBtnASCActive(value);
      }
      dispatch(setSortFilterAction(payloadSort));
    };

    const isCheckedASC = btnASCActive === "asc";
    const isCheckedDSC = btnASCActive === "desc";
    return (
      <WrapperView>
        <BtnView
          label={"Ascendant"}
          checked={isCheckedASC}
          handleClick={() => handleClick("asc")}
        />
        <BtnView
          label={"Descendant"}
          checked={isCheckedDSC}
          handleClick={() => handleClick("desc")}
        />
      </WrapperView>
    );
  };
};
