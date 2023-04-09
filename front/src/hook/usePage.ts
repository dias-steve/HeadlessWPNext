
/*=============================================
=            use Page            =
=============================================*/
/**
 * For manage the page intialiezation
 * Hydratation of the menu data from backend
 */

//Lib
import { useDispatch } from 'react-redux';

// Reducer
import { IStore } from '@/redux/rootReducer';

//Action
import {setIsEnableScrollListener, setIsShowMenuModalAction, setIsShowNavAction, setMenuListAction} from '@/features/nav/redux/navSlice'
import {setWebSiteConfig } from '@/features/settings/redux/settingsSlice';

//Type
import { IInitialData } from '@/utils/initializePage.utils';
import { useEffect } from 'react';
import { useDynamicBackground } from '@/features/dynamicBackground/hooks/useDynamicBackground';
import { setIsBlack } from '@/features/dynamicBackground/redux/dynamicBackgroundSlice';
import { useNav } from '@/features/nav/hook/useNav';
import { setShowModalCartAction } from '@/features/woocommerce/cart/redux/cart.reducer';
import { setSettingsAction } from '@/features/newsletter/redux/newsLetterSlice';
import { setCurrentLangAction, setlangListAction } from '@/features/multiLang/redux/multiLangSlice';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setContent } from '@/features/PopupRGPD/redux/RGPD.reducer';






//map state
const mapState = (state: IStore) => ({
    menu: state.nav,
    multiLang: state.multiLang,
    
})

/**
 * For manage the page intialiezation
 * Hydratation of the menu data from backend
 * @returns 
 */
export const usePage = (intialData :IInitialData, blackBg: boolean, navEnableGeneralScrollListener: boolean) => {
 

    const dispatch = useDispatch()
    const {multiLang:{changedByTheUser}} = useSelector(mapState)
    const {menus, generalSettings, newletterSettings, rgpd} = intialData
    const router = useRouter()
 
  
    const hydrateInitialData = () =>{
        multiLangInitialization()
        closeModal()
        // Nav data


        dispatch(
            setMenuListAction(menus)
        )
        // GeneralSettings data
        dispatch(
            setWebSiteConfig(generalSettings)
        )




        dispatch(setIsShowNavAction(true));
        
      
       
        dispatch(setIsEnableScrollListener(navEnableGeneralScrollListener))
     
  
        dispatch(setSettingsAction(newletterSettings))

        dispatch(setContent(rgpd))


    }

    const multiLangInitialization = () => {

        if(generalSettings.languages_supported_list){
            const listLangAvailable = generalSettings.languages_supported_list
            dispatch(
                setlangListAction(listLangAvailable)
            )
            const langBrowser = window.navigator.language.toUpperCase().split('-')[0];
            if(listLangAvailable.includes(langBrowser) && !changedByTheUser ){
                dispatch(
                    setCurrentLangAction(langBrowser)
                )
            }
        }

 
    }

    const RedirectingToMaintenance = () => {
        const {maintenance_mode:{page_maintenance_id,is_activated}}= generalSettings

        if(is_activated){
            router.push('/maintenance')
        }
    }

    const closeModal = () => {
        dispatch(
            setIsShowMenuModalAction(false)
        )
        dispatch(
            setShowModalCartAction(false)
        )
    }
    
    useEffect(() => {
  
        hydrateInitialData()


            dispatch(
              setIsBlack(blackBg)
            )
     
    }, [])
    return{
        hydrateInitialData
    }
}

export default usePage;
