/*=============================================
=           BTNDYNAMIC           =
=============================================*/
/**
 * Use to show state of the action into the btn
 */

//Libraries
import React, { useEffect, useState } from "react";

//Components
import BtnPrimary from "../BtnPrimary/BtnPrimary";
import BtnLoadingMessage from "../BtnLoadingMessage/BtnLoadingMessage";

/*=============================================
=            TYPES          =
=============================================*/
export interface BtnDynamicProps {
  label: string;
  grayColor?: boolean;
  available: boolean;
  handleClick: (e: any) => void;
  withClose?: boolean;
  isLoading?: boolean;
  validationLabel: string;
  isValidate: boolean;
  timeToDisplayValidation?: number | null;
  isSubmitBtn?:boolean
}
/*=====  End of TYPES ======*/

/**
 *  Use to show state of the action into the btn
 * @param param0
 * @returns
 */
function BtnDynamic({
  label,
  grayColor,
  available,
  handleClick,
  withClose,
  isLoading,
  validationLabel,
  isValidate,
  timeToDisplayValidation,
  isSubmitBtn
}: BtnDynamicProps) {
  const [validated, setValidated] = useState(false);
  const stylesBtn = { width: "100%", height: "100%" };
  useEffect(() => {
    if (isValidate) {
      setValidated(true);
      if (timeToDisplayValidation) {
        setTimeout(() => {
          setValidated(false);
        }, timeToDisplayValidation);
      }
    }
  }, [isValidate]);
  return (
    <>
      {isLoading ? (
        <BtnLoadingMessage
          label=""
          grayColor={false}
          style={stylesBtn}
          loading={true}
        />
      ) : validated ? (
        <BtnLoadingMessage
          label={validationLabel}
          grayColor={false}
          style={stylesBtn}
          loading={false}
        />
      ) : (
        <BtnPrimary
          label={label}
          grayColor={grayColor}
          available={available}
          handleClick={handleClick}
          style={stylesBtn}
          link={null}
          withClose={withClose}
          handleClickClose={null}
          isSubmitBtn={isSubmitBtn}
        />
      )}
    </>
  );
}

export default BtnDynamic;
