/*=============================================
=            CHECKOUT STEP FORM CONTAINER COMPONENTS         =
=============================================*/
/**
 * Use to display the step form in the chekout page
 */

//Libraries
import { FC, ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Reducer
import {
  setMaxStepForm,
  setCurrentStepFormToShow,
} from "../../redux/checkoutSlice";

//Hooks
import useTraductor from "@/features/multiLang/hooks/useTraductor";

//Types
import { IStore } from "@/redux/rootReducer";

/*=============================================
=           TYPES        =
=============================================*/
export interface GaugeProps {
  pourcentageGaugeWidth: number;
  stepsTitleList: string[];
  currentStep: number;
}

export interface WrapperProps {
  children: ReactNode;
}
export interface BtnGroupeProps {
  labelNext: string;
  handleNext: () => void;
  labelPrevious: string;
  handlePrevious: () => void;
}

export interface StepProps {
  handlePrevious: () => void;
  orderId: number | null;
}
export interface LabelBtnStepForm {
  previousLabel: string;
  nextLabel: string;
}

/*=====  End of Section TYPES ======*/

//MapState
const mapState = (state: IStore) => ({
  checkout: state.checkout,
});

//Step code
export const step = {
  cartStep: 1,
  shippingStep: 2,
  paymentStep: 3,
  validationStep: 4,
};

const stepTitleList = [
  "FR=Panier|EN=Cart",
  "FR=Livraison|EN=Shipping",
  "FR=Paiement|EN=Payment",
  "FR=Validation|EN=Validation",
];

/**
 * Gauge Container
 * @param Gauge Gauge Views
 * @returns
 */
export const withGaugeContainer = (Gauge: FC<GaugeProps>) => {
  return function Container() {
    const { getTextStringTraduction } = useTraductor();
    const listTitleTraduced = stepTitleList.map((title) =>
      getTextStringTraduction(title)
    );
    const {
      checkout: { currentStepFormToShow: currentStep, maxStep },
    } = useSelector(mapState);

    const getWithPourcentage = () => {
      if (maxStep > 0) {
        return (currentStep * 100) / maxStep;
      } else {
        return 0;
      }
    };

    return (
      <Gauge
        currentStep={currentStep}
        stepsTitleList={listTitleTraduced}
        pourcentageGaugeWidth={getWithPourcentage()}
      />
    );
  };
};

/**
 * Chechouk Step From Container
 * @param CheckoutGlobalWrapper Global Wrapper View
 * @param CheckoutStepWrapper Step Windows Wrapper
 * @param BtnGroup Button Group View display below the Step Windows
 * @param singleStepForm List of single step view
 * @param labelNextPrevTab list of label next
 * @returns
 */
export const withCheckoutStepFormContainer = (
  CheckoutGlobalWrapper: FC<WrapperProps>,
  CheckoutStepWrapper: FC<WrapperProps>,
  singleStepForm: FC<StepProps>[]
) => {
  return function Container() {
    const dispatch = useDispatch();
    const {
      checkout: { currentStepFormToShow: currentStep, orderIdValidated },
    } = useSelector(mapState);
    const maxStep = singleStepForm.length;

    useEffect(() => {
      dispatch(setCurrentStepFormToShow(1));
      dispatch(setMaxStepForm(maxStep));
    }, []);
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [currentStep])
    const getWithPourcentage = () => {
      if (maxStep > 0) {
        return (currentStep * 100) / maxStep;
      } else {
        return 0;
      }
    };
    const handleNextStep = () => {
      if (currentStep < maxStep) {
        dispatch(setCurrentStepFormToShow(currentStep + 1));
      }
    };

    const handlePreviousStep = () => {
      if (currentStep > 1) {
        dispatch(setCurrentStepFormToShow(currentStep - 1));
      } else {
        // go to the boutique
      }
    };

    const CurrentStep = singleStepForm[currentStep - 1];

    const NextBTNTest = () => {
      return (
        <span onClick={() => {handleNextStep()}}>Next test</span>
      )
    }
    return (
      <CheckoutGlobalWrapper>
        <CheckoutStepWrapper>
          {
            <CurrentStep
              orderId={orderIdValidated}
              handlePrevious={handlePreviousStep}
            />
          }
        </CheckoutStepWrapper>
   
      </CheckoutGlobalWrapper>
    );
  };
};
