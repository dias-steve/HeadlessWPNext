/*=============================================
=            CHECKOUT STEP FORM  Presentational COMPONENTS         =
=============================================*/
/**
 * Use to display the step form in the chekout page
 */

//Libraries
import React from "react";
import Link from "next/link";

//Container
import {
  BtnGroupeProps,
  GaugeProps,
  LabelBtnStepForm,
  StepProps,
  WrapperProps,
  withCheckoutStepFormContainer,
  withGaugeContainer,
} from "./CheckoutStepFormContainer";

//Components
import CartList, {
  CartListWrapper,
  ReadOnlyListItemCartValidated,
} from "@/features/woocommerce/cart/components/CartList/CartList";
import CartValidationBtn from "@/features/woocommerce/cart/components/CartValidationBtn/CartValidationBtn";
import GlobalCheckoutForm from "../Form/GlobalCheckoutForm/GlobalCheckoutForm";
import ShippingList from "../ShippingtList/ShippingList";
import BtnNext from "../BtnNext/BtnNext";
import BtnValidateShippingStep from "../BtnValidateShippingStep/BtnValidateShippingStep";
import InputField from "@/components/molecules/Form/InputFields/InputField";
import { GlobalContent } from "@/components/atoms/container/GlobalContainer/GlobalContainer";
import BtnPrimary from "@/components/atoms/btn/BtnPrimary/BtnPrimary";
import LogoSite from "@/components/molecules/LogoSite/LogoSite";

//Hooks
import useTraductor from "@/features/multiLang/hooks/useTraductor";
import useCheckout from "../../hooks/useCheckout";
import useCart from "@/features/woocommerce/cart/hooks/useCart";

//Utils
import { vocalubary } from "@/utils/vocabulary";

//Stripe
import { CardElement } from "@stripe/react-stripe-js";

//Style
import styles from "./Checkout.module.scss";
import Spinner from "@/components/atoms/Spinner/Spinner";
import GCSInfo from "../GCSInfo/GCSInfo";

/**
 * Next label
 */
const labelNextPrevTab: LabelBtnStepForm[] = [
  { previousLabel: "boutique", nextLabel: "livraison" },
  { previousLabel: "retour au painer", nextLabel: "allez au paiement" },
  { previousLabel: "retour à la livraison", nextLabel: "payer" },
  { previousLabel: "boutique", nextLabel: "livraison" },
];

/**
 * Checkout step wrapper
 * @param param0
 * @returns
 */
const CheckoutStepWrapper = ({ children }: WrapperProps) => {
  return <div>{children}</div>;
};

/**
 * Checkout global wrapper
 * The wrapper general
 * @param param0
 * @returns
 */
const CheckoutGlobalWrapper = ({ children }: WrapperProps) => {
  return <div>{children}</div>;
};

/**
 * Gauge to display the state of the filling of the form
 * @param param0
 * @returns
 */
const GaugeView = ({
  pourcentageGaugeWidth,
  currentStep,
  stepsTitleList,
}: GaugeProps) => {
  return (
    <div className={styles.global_container_gauge}>
      <GlobalContent>
        <div className={styles.logo_container}>
          <div className={styles.logo_wrapper}>
            <LogoSite color={"black"} />
          </div>
        </div>
        <div className={styles.steps_container}>
          {stepsTitleList.map((title, index) => {
            const isCurrent = index + 1 <= currentStep;
            return (
              <span
                key={index}
                className={[
                  styles.step_title,
                  isCurrent ? styles.current : "",
                ].join(" ")}
                dangerouslySetInnerHTML={{ __html: index + 1 + ". " + title }}
              />
            );
          })}
        </div>
        <div className={styles.gaugeWrapper}>
          <div className={styles.dash}>
            <div
              className={styles.gauge}
              style={{ width: pourcentageGaugeWidth + "%" }}
            />
          </div>{" "}
        </div>
      </GlobalContent>
    </div>
  );
};

export const Gauge = withGaugeContainer(GaugeView);

/**
 * Stripe Card Configurator
 */
const configCardElement: any = {
  iconStyle: "solid",
  style: {
    base: {
      fontSize: "16px",
    },
  },
  hidePostalCode: true,
};

/**
 * Cart Info View Widget
 * Display the total, nb item ...
 * @returns
 */
const CartInfoView = () => {
  const {
    validateCart,
    isLoading,
    getSubTotalPriceCart,
    getTotalQuantityItemCart,
    isValidateCart,
  } = useCart();
  const { getTextObjectTraduction } = useTraductor();
  return (
    <>
      {getTotalQuantityItemCart() > 0 && (
        <div className={styles.cart_info_container}>
          <p className={[styles.info_text].join(" ")}>
            {" "}
            {getTotalQuantityItemCart()}{" "}
            {getTextObjectTraduction(vocalubary.item)}
            {getTotalQuantityItemCart() > 1 && "s"}
          </p>
          <p className={[styles.info_text].join(" ")}>
            {" "}
            {getTextObjectTraduction(vocalubary.subtotal)}:{" "}
            {getSubTotalPriceCart()}€
          </p>
        </div>
      )}
    </>
  );
};

/**
 * Display the Cart Step
 * @returns
 */
const CartView = () => {
  const { getTextStringTraduction } = useTraductor();
  const title = getTextStringTraduction("FR=Panier|EN=Cart");
  const previousLabel = getTextStringTraduction(
    "FR=Retourner à la boutique|EN=Go back to the shop"
  );
  const { getTotalQuantityItemCart } = useCart();
  return (
    <div
      className={[styles.global_container_panier, styles.container_view].join(
        " "
      )}
    >
      <div className={styles.wrapper_panier}>
        <h2 className={styles.section_title}>{title}</h2>

        <CartList />
      </div>
      <CartInfoView />
      <div className={styles.btn_container}>
        <div className={styles.validation_btn}>
          {getTotalQuantityItemCart() > 0 ? (
            <CartValidationBtn />
          ) : (
            <BtnPrimary
              label={previousLabel}
              link={"/"}
              grayColor={false}
              withClose={false}
              available={true}
              handleClick={null}
              style={{}}
           
         
              handleClickClose={null}
            />
          )}
        </div>
        {getTotalQuantityItemCart() > 0 && (
          <Link className={styles.btn_pevious} href={"/"}>
            <span>{previousLabel} </span>
          </Link>
        )}
      </div>
    </div>
  );
};

/**
 * Order Info Widget
 * Display the total ...
 * @returns
 */
const OrderInfoView = () => {
  const { orderInfo } = useCheckout();
  const { getTextObjectTraduction } = useTraductor();

  const {
    getSubTotalPrice,
    getTotal,
    getTotalQuantity,
    getSubTotalShippingCost,
  } = orderInfo;
  return (
    <div className={styles.info_order_global_container}>
      <div className={styles.row_bill}>
        <span className={styles.label_bill}>
          {" "}
          {getTextObjectTraduction(vocalubary.nb_items)}:
        </span>
        <span className={styles.cost}>{getTotalQuantity()}</span>
      </div>
      <div className={styles.row_bill}>
        <span className={styles.label_bill}>
          {getTextObjectTraduction(vocalubary.subtotal)}:
        </span>
        <span className={styles.cost}> {getSubTotalPrice()}€</span>
      </div>
      <div className={styles.row_bill}>
        <span className={styles.label_bill}>
          {getTextObjectTraduction(vocalubary.shipping_cost)}:
        </span>
        <span className={styles.cost}>{getSubTotalShippingCost()}€</span>
      </div>

      <div className={[styles.row_bill, styles.total_row].join(" ")}>
        <span className={styles.label_bill}>Total:</span>
        <span className={styles.cost}>{getTotal()}€</span>
      </div>
    </div>
  );
};

/**
 * Display the Shipping Step
 * @param param0
 * @returns
 */
const ShippingView = ({ handlePrevious }: StepProps) => {
  const { getTextStringTraduction } = useTraductor();

  const previousLabel = getTextStringTraduction(
    "FR=Retourner au panier|EN=Go back to the cart"
  );
  return (
    <div
      className={[styles.shipping_container_view, styles.container_view].join(
        " "
      )}
    >
      <div className={styles.form_shipping_container}>
        <GlobalCheckoutForm />
        <ShippingList />

        <div className={styles.btn_container}>
          <div className={styles.order_info_btn_wrapper}>
            <OrderInfoView />
          </div>
          <div className={styles.validation_btn}>
            <BtnValidateShippingStep />
          </div>
          <span
            onClick={(e) => {
              e.preventDefault();
              handlePrevious();
            }}
            className={styles.btn_pevious}
          >
            {previousLabel}
          </span>
        </div>
      </div>
      <div className={styles.form_info_order_container}>
        <div className={styles.order_info_wrapper}>
          <OrderInfoView />
        </div>
      </div>
    </div>
  );
};

const LoaderPayment = () => {
  const {getTextStringTraduction} = useTraductor()
  const messageOne = getTextStringTraduction("FR=Paiement en cours...|EN=Payment Processing...");
  const messageTow = getTextStringTraduction("FR=Veuillez ne pas quitter svp|EN=Please, Don&#39;t leave the page");
  return (
    <div className={styles.loader_payment}>
      {" "}
      <div className={styles.spinner_wrapper}>
        <img className={styles.cb_card} src={'/card.svg'} alt={'card icon'} />
        <Spinner blackCircle={false} />
      </div>{" "}
      <div className={styles.message_wrapper}>
        <span className={[styles.messages, styles.message_one].join(" ")} dangerouslySetInnerHTML={{__html
        : messageOne}} />
        <span className={[styles.messages, styles.message_tow].join(" ")} dangerouslySetInnerHTML={{__html
        : messageTow}} />
      </div>
    </div>
  );
};
/**
 * Display the Payment step
 */
const PaymentView = ({ handlePrevious }: StepProps) => {
  const { getTextStringTraduction } = useTraductor();
  const { getPropsFormFields, isLoading } = useCheckout();
  const title = getTextStringTraduction(
    "FR=Paiement par Carte Bancaire|EN=Payment by Credit Card"
  );
  const previousLabel = getTextStringTraduction(
    "FR=Retourner à la livraison|EN=Go back to the shipping"
  );
  return (
    <>
      <div
        className={[styles.container_view, styles.shipping_container_view].join(
          " "
        )}
      >
        {isLoading() && <LoaderPayment />}
        <div className={styles.form_shipping_container}>
          <div className={styles.wrapper_payment}>
            <h2 className={styles.section_title}>{title}</h2>
            <InputField
              type={"text"}
              label={getTextStringTraduction(
                "FR=Nom du titulaire|EN=Card Name"
              )}
              {...getPropsFormFields(["cardName"])}
            />
            <div className={styles.card_container}>
              <CardElement options={configCardElement} />
            </div>
          </div>
          <div className={styles.btn_container}>
            <div className={styles.order_info_btn_wrapper}>
              <OrderInfoView />
            </div>
            <div className={styles.gcs_wrapper}> <GCSInfo/></div>
            <div className={styles.validation_btn}>
              <BtnNext />
            </div>
            <span
              onClick={(e) => {
                e.preventDefault();
                handlePrevious();
              }}
              className={styles.btn_pevious}
            >
              {previousLabel}
            </span>
          </div>
        </div>
        <div className={styles.form_info_order_container}>
          <div className={styles.order_info_wrapper}>
            <OrderInfoView />
          </div>
        </div>
      </div>
    </>
  );
};


const ValidationView = ({ orderId }: StepProps) => {
  const { getTextStringTraduction } = useTraductor();
  const title = getTextStringTraduction(
    "FR=Votre commande #" +
      orderId +
      " est enregistrée |EN= Your order #" +
      orderId +
      " has been registered"
  );
  const message = getTextStringTraduction(
    "FR=Merci! Votre commande sera expédiée dans les meilleurs délais|EN=Thank you! Your order will be shipped as soon as possible"
  );
  const previousLabel = getTextStringTraduction(
    "FR=Retourner à la boutique|EN=Go back to the shop"
  );
  return (
    <div
      className={[
        styles.global_container_validation_step,
        styles.container_view,
      ].join(" ")}
    >
      <div  className={styles.validation_icon_wrapper}>
      <img
        className={styles.validation_icon}
        src={"/validate-only-icon.svg"}
        alt={"validation icon"}
      />
      <img
        className={styles.validation_icon_contour}
        src={"/validate-contour-icon.svg"}
        alt={"validation icon"}
      />
      </div>
      <h2 className={styles.title_validation}>{title}</h2>
      <p className={styles.message}>{message}</p>
      <div className={styles.btn_container}>
        <div className={styles.validation_btn}>
          <BtnPrimary
            label={previousLabel}
            link={"/"}
            grayColor={false}
            withClose={false}
            available={true}
            handleClick={null}
            handleClickClose={null}
            style={{}}
          />
        </div>
      </div>
    </div>
  );
};

export default withCheckoutStepFormContainer(
  CheckoutGlobalWrapper,
  CheckoutStepWrapper,
  [CartView, ShippingView, PaymentView, ValidationView],

);
