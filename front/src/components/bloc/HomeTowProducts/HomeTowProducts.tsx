/*=============================================
=        HOME TOW PRODUCTS      =
=============================================*/
/**
 * Style component displaying home tow product section
 */

//Libraries
import { FC } from 'react'

//Styles
import styles from './HomeTowProducts.module.scss'

//Types
import { BlocProps } from '../type'

//Components
import ProductListStatic from '@/components/molecules/ProductListStatic/ProductList'
import { useHomeTowPorductAnnimation } from './useHomeTowProductsAnnimation'

/**
 * Style component displaying home tow product section
 * @param param0 
 * @returns 
 */
export const HomeTowProducts : FC<BlocProps> = ({ content, gsap }) => {
    const { product_list, title_1, product_btn_label} =content
    const nbProduct = product_list && product_list.length
    const title = title_1+'['+nbProduct+']'

    const {productListRef}=useHomeTowPorductAnnimation(gsap)
    return (
        <section className={styles.global_container}>
            <div className={styles.global_content}>

            <div className={styles.title_wrapper}>
            <h2  className={styles.title} dangerouslySetInnerHTML={{__html:title}}/>
            </div>
            <div className={styles.product_wrapper}>

    
            <div ref={productListRef}className={styles.product_list_wrapper}>
            {product_list &&
                <ProductListStatic cardSize={'medium small'} listProduct={product_list} labelBtn={product_btn_label? product_btn_label : 'voir'}/>
            }
            </div>
            </div>
            </div>
        </section>
    )
}

export default HomeTowProducts