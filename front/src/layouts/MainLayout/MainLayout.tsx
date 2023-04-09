/*=============================================
=      MAIN LAYOUT             =
=============================================*/
/**
 * Layout use for regular user
 */

//lib
import React, { ReactNode } from "react";
import { useRouter } from "next/router";

//components
import LineBackground from "@/features/dynamicBackground/component/DynamicBackground/LineBackground/LineBackground";
import MenuModal from "@/features/nav/components/Nav/NavMobile/MenuModal/MenuModal";
import ProductListLoader from "@/components/molecules/ProductListLoader/ProductListLoader";
import CartModal from "@/features/woocommerce/cart/components/CartModal/CartModal";
import Toast from "@/features/Toast/components/Toast/Toast";
import { useMaintenanceMode } from "@/features/maintenanceMode/hooks/useMaintenanceMode";
import PopupRGPD from "@/features/PopupRGPD/components/PopupRGPD";


//Hook


function MainLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const childrenData : any | null = children;
  const initialData: any = childrenData ?.props?.initialData;
  const { is_activated: isModeMaintenance} = useMaintenanceMode(initialData)
  return (
    <>
      <LineBackground />
   
      {router.isFallback ? (
        <ProductListLoader />
      ) : (
        <>
        {!isModeMaintenance &&
        <>
          <PopupRGPD />
          <MenuModal />
          <Toast />
          <CartModal />
          {children}
          </>
        }
        </>
      )}
    </>
  );
}

export default MainLayout;
