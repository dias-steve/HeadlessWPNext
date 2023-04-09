import { IStore } from '@/redux/rootReducer'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setWoocommerceSettingsAction } from '../redux/woocommerceSettingsSlice'
import { IWooCommerceSettings } from '../../types'

const mapState = (state: IStore) => ({
    woocommerceSettings: state.woocommerceSettings
})
export const useWooCommerce = (isIntialisation: boolean, wooCommerceSettingData: IWooCommerceSettings|null) => {
    const {woocommerceSettings: {woocommerceSettings:{stripe_settings:{page_link_gcs,info_text_gcs}}}} = useSelector(mapState)

    const dispatch = useDispatch()
    useEffect(() => {

        if(isIntialisation &&  wooCommerceSettingData ){
            dispatch(
                setWoocommerceSettingsAction(wooCommerceSettingData)
            )
        }
    }, [])
    return {
        page_link_gcs,
        info_text_gcs,
    }
}
