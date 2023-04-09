import { useDispatch, useSelector } from "react-redux";
import { setIsAccepted } from "../redux/RGPD.reducer";
import { IStore } from "@/redux/rootReducer";
import { FC } from "react";
import useTraductor from "@/features/multiLang/hooks/useTraductor";
import { useRouter } from "next/router";


const mapState = (state : IStore) => ({
    rgpd: state.rgpd,
});

export interface PopupViewProps {
    message: string | null | false;
    title: string | null | false;
    primaryBTNLabel: string;
    pimaryBTNHandleClick : (e:any) =>void;
    secondBTNLabel: string;
    secondBTNLink: string | null | false;
}
export const withContainer = (PopupView: FC< PopupViewProps>) => {

    return function Container (){
        const {rgpd: {content, isAccepted}} = useSelector(mapState);
    
        const {pathname} = useRouter();
        const pagetoNotDisplay = ['/maintenance']
        const notDisplay = pagetoNotDisplay.includes(pathname)
        const dispatch = useDispatch();
        const {getTextStringTraduction} = useTraductor();
        const handleClickAccept = (e: any) => {
            e.preventDefault()
            dispatch(
                setIsAccepted(true)
            )
        }

        const title =content?.title && getTextStringTraduction(content.title)
        const message =content?.message && getTextStringTraduction(content.message)
        const rgpd_pop_up_btn_label_cookie = content?.rgpd_pop_up_btn_label_cookie  ?
            getTextStringTraduction(content.rgpd_pop_up_btn_label_cookie):
            getTextStringTraduction("FR=Politique des Cookies|EN=Cookies Policy")
            const btn_label_accept = content?.btn_label_accept  ?
            getTextStringTraduction(content.btn_label_accept):" OK"

        return (
        <>{
            !notDisplay && !isAccepted &&
            <>
            <PopupView 
                message = {message || false}
                title= {title || false}
                primaryBTNLabel= {btn_label_accept || "Ok"}
                pimaryBTNHandleClick = {(e) => handleClickAccept(e)}
                secondBTNLabel= {rgpd_pop_up_btn_label_cookie}
                secondBTNLink = {content?.rgpd_pop_up_btn_link_cookie || false}
            />
            </>
        }
        </>
        )
    }
}