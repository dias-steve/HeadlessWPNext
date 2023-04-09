import useTraductor from '@/features/multiLang/hooks/useTraductor'
import { useWooCommerce } from '@/features/woocommerce/woocommerceSettings/hook/useWooCommerce'
import React from 'react'
import styles from './GCSInfo.module.scss'
import Link from 'next/link'
function GCSInfo() {
    const {info_text_gcs, page_link_gcs} = useWooCommerce(false,null )
    const {getTextStringTraduction} = useTraductor()
    const text =info_text_gcs? getTextStringTraduction(info_text_gcs): ''
    const link = page_link_gcs;
    const label = getTextStringTraduction('FR=Conditions générales de vente|EN= General Condition of Sale')
  return (
<>
    {link ?

      <p className={styles.text}>{text} <Link target="_blank" href={link}><br/><span className={styles.link} dangerouslySetInnerHTML={{__html: label}}/></Link></p> :  <p className={styles.text}>Payment not availble Please try later</p>
        }
      </>
  )
}

export default GCSInfo
