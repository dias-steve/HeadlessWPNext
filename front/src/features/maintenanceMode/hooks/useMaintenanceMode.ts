import { IStore } from "@/redux/rootReducer"
import { IInitialData } from "@/utils/initializePage.utils"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { setIsAuthmaintenanceModeAction, setdateAuthAction } from "../redux/maintenanceModeSlice"


const mapState = (state: IStore) => ({
    modeMaintenance: state.modeMaintenance
})
export const useMaintenanceMode = (intialData :IInitialData |null) => {
    const router = useRouter()
    const is_auth = useCheckingUserAuthValid()

    const pathAllowed = ['/maintenance', '/frontaccessticket']

    if(is_auth) {
        return {
            is_activated: false,
        }
    }

    if (intialData && !pathAllowed.includes(router.pathname)){
            const {menus, generalSettings, newletterSettings} = intialData
            const {maintenance_mode:{page_maintenance_id,is_activated}}= generalSettings;
            if(is_activated){
                router.push('/maintenance')
            }
            return {
                is_activated
            }
    }else{
            return {
                is_activated: false,
            }
    }
}


export const useCheckingUserAuthValid = () => {
    const {modeMaintenance:{date_auth, is_auth}} = useSelector(mapState);
    const dispatch = useDispatch();
    useEffect((
    ) => {
        if(!checkDateAuth(date_auth)){
            dispatch(
                setdateAuthAction(null)
            )
            dispatch(
                setIsAuthmaintenanceModeAction(false)
            )
        }
    },[])
    return is_auth
  
}

export const checkDateAuth = (date: number | null) =>{
    const today = Number(new Date().toJSON().slice(0,10).replace(/-/g,''));
    if(!date){
        return true;
    }
    if(today >= date){
        return true
    }else{
        return false
    }
}