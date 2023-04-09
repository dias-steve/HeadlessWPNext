import { CartModalProps, withCartModalContainer } from "./CartModalContainer"
import styles from './CartModal.module.scss'
import CartList from './../CartList/CartList'
import useCart from "../../hooks/useCart"
import CartView from "../CartView/CartView"
export const CartModal = ({itWillClose} : CartModalProps) => {
    const {setShowModalCart} =useCart()
    return (
        <div className={[styles.global_container,itWillClose? styles.hide: styles.show].join(" ")}>
            <div className={styles.global_icon_close}onClick={() => {
                setShowModalCart(false)
            }}>
                <img alt={'close'}
                    src={'/icon-cross.svg'}
                />
            </div>
            <div className={styles.cart_container}>
                <div className={styles.cart_wrapper}>
                <CartView />
                </div>
            </div>
        

        </div>
    )
}

export default withCartModalContainer(CartModal)