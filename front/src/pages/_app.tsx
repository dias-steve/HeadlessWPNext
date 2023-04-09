import '../styles/globals.scss';
import { store, persistor } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AppProps } from 'next/app';
// Layout
import MainLayout from '@/layouts/MainLayout/MainLayout';
import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps, router } : AppProps) {

  return <Provider store={store}>
  <PersistGate persistor={persistor}>

    <MainLayout>

    <Component {...pageProps} key={router.asPath}/>

    </MainLayout>

  </PersistGate>
    </Provider>
}

export default MyApp
