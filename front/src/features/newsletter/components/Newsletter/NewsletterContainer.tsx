/*=============================================
=            NEWSLETTER CONTAINER COMPONENTS          =
=============================================*/
/**
 * Module manage the newletter feature
 */

import { useTranstionDisplayComponents } from "@/hook/useTransitionDisplayComponent";
import { IStore } from "@/redux/rootReducer";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { isShowNewsLetterModalAction, isShowNewsLetterWidgetAction } from "../../redux/newsLetterSlice";
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import useCaptchaGoogle from "@/features/captchaGoogle/hooks/useCaptchaGoogle";
import validator from "validator";
import { setEmail } from "@/features/woocommerce/checkout/redux/checkoutSlice";
import useTraductor from "@/features/multiLang/hooks/useTraductor";


/*=============================================
=            TYPES          =
=============================================*/
export interface WidgetNewLetterViewProps {
    btnLabel : string;
    handleClickOpen : () => void;
    handleClickClose : () => void;
    message: string;
    isWillBeKilled: boolean;
    withClose : boolean;
    beCentered: boolean;
}

export interface ModalNewLetterViewProps {
    btnLabel : string;
    handleClickSubscribe : () => void;
    available: boolean;
    isloading: boolean;
    isValidate: boolean;
    handleClickClose : () => void;
    message: string;
    handleChangeMail: (value: string) => void;
    handleChangeName: (value: string) => void;
    messageErrorMail: string;
    messageErrorName: string;
    isWillBeKilled: boolean;
    mailValue: string;
    nameValue:  string;  
    onValidated: (formData: any) => any;
    status: any;
    title: string;
}

export interface EmailFormFields {
    FNAME:string,
    EMAIL: string
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;

//MapState
export const mapState = (state: IStore) => ({
    newsletter: state.newsletter
})


/**
 * Newsletter container 
 * Display the newsletter widget and modale 
 * @param WidgetView 
 * @param ModalNewLetterView 
 * @returns 
 */
export const withNewsletterContainer = (WidgetView: FC<WidgetNewLetterViewProps>, ModalNewLetterView: FC<ModalNewLetterViewProps>, labelBtn: string | null | undefined, message:  string | null | undefined, centerBtn:  boolean | undefined) => {
    return function Container () {
        const [mail, setMail] = useState("");
        const [name, setName] = useState("");
        const [isLoading, setIsLoading] = useState(false);
        const [isValidate, setIsValidate] = useState(false);
        const [mailError, setMailError ] = useState("");
        const [nameError, setNameError] = useState("");
 
        

        const {newsletter:{isShowNewsLetterModal, isShowNewsLetterWidget, settings:{url_form_mailchip, title: titleModal, text_widget, label_btn}}} = useSelector(mapState)
        const dispatch = useDispatch()
        const { isKilledComponent: isKilledWidget ,isWillBeKilledCompponent: isWillBeKilledWidget,} = useTranstionDisplayComponents( isShowNewsLetterWidget, 400)
        const { isKilledComponent: isKilledModal ,isWillBeKilledCompponent: isWillBeKilledModal,} = useTranstionDisplayComponents( isShowNewsLetterModal, 400)
        
        const [availableBtnSubcribe, setAvailableBtnSubcribe] = useState(true)

        const {getTextStringTraduction} = useTraductor()

        const {executeRecaptchaGoogle}= useCaptchaGoogle(() => {}, () => {})

      
        const handleOpenModal = () => {
            dispatch(
                isShowNewsLetterWidgetAction(false)
            )
            dispatch(
                isShowNewsLetterModalAction(true)
            )
        }

        const handleCloseModal = () => {
            setName('')
            setMail('')
            setMailError('')
            setNameError('')
            dispatch(
                isShowNewsLetterWidgetAction(true)
            )
            dispatch(
                isShowNewsLetterModalAction(false)
            )
        }
        
        const handleCloseWidget = () => {
            dispatch(
                isShowNewsLetterWidgetAction(false)
            )
            dispatch(
                isShowNewsLetterModalAction(false)
            )

    
        }

        const checkingValueInput = () => {
            let errorFound= false;
            if(!validator.isEmail(mail)){
                errorFound=true;
                setMailError(getTextStringTraduction('FR=Veuillez entrer un email valide svp|EN=Pease, enter a valid email address'))
            }
            if(validator.isEmpty(name, {
                ignore_whitespace: true,
                
              })){
                errorFound=true;
                setNameError(getTextStringTraduction('FR=Veuillez entrer un nom valide svp|EN=Pease, enter a valid name '))
            }
            if(errorFound){
                setAvailableBtnSubcribe(false)
            }
            return !errorFound;
        }
        const checkingSubcribtion = async (sendSubcribtion: () => void) => {

            setIsLoading(true)
            try{
                const isSucess = await executeRecaptchaGoogle({email: mail, name:name})
                const checkValue = checkingValueInput();
                  if(isSucess && checkValue){
                        sendSubcribtion();
                     
                      setIsLoading(false)
                      setIsValidate(true)
                      setTimeout(() => {setIsValidate(false)}, 3000)
                      console.log('sucess')
                  }else{
                      console.log('not sucess')
                      setIsLoading(false)
                  }
            }catch(err: any){
                setIsLoading(false)
            }

        

        }

        const handleSetName = (value: string) => {
            setName(value)
            setNameError('')
            if(mailError === ''){
                setAvailableBtnSubcribe(true)
            }
        }

        const handleSetMail = (value: string) => {
            setMail(value)
            setMailError('')
            if(nameError === ''){
                setAvailableBtnSubcribe(true)
            }
        }
 
        const title = message ? message : titleModal || '';
        const messageWidget =  text_widget ? getTextStringTraduction(text_widget) : '';
        const labelBtnWidget = getTextStringTraduction(labelBtn ? labelBtn: ((label_btn &&  label_btn!== "" )?  label_btn: 'FR=S&#39;abonner|EN=Subscribe'))
        
        return (
            <>
         
            {
                !isKilledWidget &&
                    <WidgetView
                    btnLabel = {labelBtnWidget}
                    handleClickOpen = {handleOpenModal}
                    handleClickClose = {handleCloseWidget}
                    message = {messageWidget}
                    isWillBeKilled = {isWillBeKilledWidget}
                    withClose = {centerBtn ? false : true}
                    beCentered = {centerBtn ? centerBtn : false}
                    />
            }

        {
                !isKilledModal && url_form_mailchip && url_form_mailchip !== ''&&

                <MailchimpSubscribe
                url={url_form_mailchip}
                render={ ( props ) => {
                  const { subscribe, status, message } = props || {};
                  const sub = (v : any) => {
                    subscribe(v)
                    console.log(v)
                  }
                  const excecutSubcription =  () => {
                    sub({ EMAIL: mail, FNAME: name })
                  }
                  const handleSubcribe = () => {
          
                    checkingSubcribtion(excecutSubcription)

                }
                  return (
                    
        
                    <ModalNewLetterView
                    btnLabel = {getTextStringTraduction('FR=Envoyer|EN=Send')}
                    handleClickSubscribe = {() => handleSubcribe()}
                    available = {availableBtnSubcribe}
                    isloading = {isLoading}
                    isValidate = {isValidate}
                    handleClickClose = { handleCloseModal}
                    message = {status === "success" ? getTextStringTraduction('FR=Envoyé|EN=Sended') : status || "error"}
                    handleChangeMail = {(value) =>handleSetMail(value)}
                    handleChangeName = {(value) =>handleSetName(value)}
                    messageErrorMail = {mailError}
                    messageErrorName = {nameError}
                    isWillBeKilled = {isWillBeKilledModal}
                    mailValue={mail}
                    nameValue={name}
                    status={status}
                    title={ getTextStringTraduction(title)}
                    onValidated={formData => {
                        subscribe(formData)}}
                    />
                  
                  );
                } }
              />
               
              
            }
        

            </>
          

        )
    }
}