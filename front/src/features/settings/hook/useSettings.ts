
/*=============================================
=            USESETTING            =
=============================================*/
/**
 * For give access to the configuration website
 */

//Lib
import { IStore } from '@/redux/rootReducer';
import React from 'react';
import { useSelector } from 'react-redux';
//Action

//mapSate
const mapSate = (state: IStore) => ({
    settings : state.settings
})

export const useSettings = () => {

    const {settings: {webSiteConfig}} = useSelector(mapSate)
    
    return {
        webSiteConfig
    }
}

export default useSettings

