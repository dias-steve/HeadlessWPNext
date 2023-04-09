import React, { FC, useEffect, useState } from "react";
import { store } from "./../../redux/store";
import { fetchShippingDataStart } from "@/features/woocommerce/checkout/redux/checkoutSlice";
import ShippingList from "./../../features/woocommerce/checkout/components/ShippingtList/ShippingList";
import CartList, {
  ReadOnlyListItemCartValidated,
} from "@/features/woocommerce/cart/components/CartList/CartList";
import GlobalCheckoutForm from "@/features/woocommerce/checkout/components/Form/GlobalCheckoutForm/GlobalCheckoutForm";
import OrderInfo from "@/features/woocommerce/checkout/components/OrderInfo/OrderInfo";
import BtnNext from "@/features/woocommerce/checkout/components/BtnNext/BtnNext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";
import CheckoutStepForm, { Gauge } from "@/features/woocommerce/checkout/components/CheckoutStepForm/CheckoutStepForm";
import { useDispatch } from "react-redux";

import styles from "./Checkout.module.scss";
import {
  GlobalContainer,
  GlobalContent,
} from "@/components/atoms/container/GlobalContainer/GlobalContainer";
import { IInitialData,  getDataFromBackend, getInitialData } from "@/utils/initializePage.utils";
import usePage from "@/hook/usePage";
import SEO from "@/features/seo/components/SEO";
import { IWooCommerceSettings } from "@/features/woocommerce/types";
import { useWooCommerce } from "@/features/woocommerce/woocommerceSettings/hook/useWooCommerce";


function Index({initialData, wCSettingsData }:{ initialData: IInitialData, wCSettingsData: IWooCommerceSettings}) {

  usePage(initialData, false, true);
 useWooCommerce(true,wCSettingsData)
  const stripeKey: any = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(stripeKey)
  );

  return (
    <>
        <SEO title={'FR=Commande|EN=Checkout'}/>
        <Gauge/>
        <GlobalContainer padding={true} >
          <GlobalContent>
          <Elements stripe={stripePromise}>
            <CheckoutStepForm />
          </Elements>
          </GlobalContent>
        </GlobalContainer>
 
    </>
  );
}

export default Index;

export async function getStaticProps() {
  //Getting general settings
  const initialData: any = await getInitialData();
  const wCSettingsData: IWooCommerceSettings= await getDataFromBackend('/wc/settings')


  return {
    props: {
      initialData,
      wCSettingsData,
    },
    revalidate: 60,
  };
}