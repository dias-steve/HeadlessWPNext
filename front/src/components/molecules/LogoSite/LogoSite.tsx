/*=============================================
=       Logo Site            =
=============================================*/
/**
 * Display the logo of the brand
 */

//Libraries
import React from 'react';
import Link from 'next/link';

//Hooks
import useSettings from '@/features/settings/hook/useSettings';

//Styles
import styles from './LogoSite.module.scss'

/**
 * Display the logo of the brand
 * @param param0 
 * @returns 
 */
export const LogoSite = ({color}: {color:'black'|'white'}) => {
    const {webSiteConfig: {logo_src}} = useSettings()
    if (!logo_src || logo_src===""){
        return null;
    }
    return(
        <Link href={'/'}>
            <img className={styles.image} src={logo_src} alt='logo brand'/>
        </Link>
    )
}

export default LogoSite