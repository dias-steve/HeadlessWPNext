import { all, call } from 'redux-saga/effects';

 import { productSagas } from '@/features/woocommerce/productlist/redux/index'
 import productsagawc from '@/features/woocommerce/productsingle/redux/singleproduct.saga'
 import cartSaga from '@/features/woocommerce/cart/redux/cart.saga'
 import checkoutSaga from '@/features/woocommerce/checkout/redux/checkout.saga'

export default function* rootSaga() {
    yield all([
        call(productSagas.productListSaga),
        call(productsagawc),
        call(cartSaga),
        call(checkoutSaga)
    ])
}