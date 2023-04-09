
/*=============================================
=            USE TRADUCTOR            =
=============================================*/
/**
 * For multilang website
 */
import { setChangedByTheUserAction, setCurrentLangAction } from '@/features/multiLang/redux/multiLangSlice';
import { IStore } from '@/redux/rootReducer';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


const SEPARATORTEXT = '|'

const mapState = (state: IStore) =>({
    multiLang: state.multiLang
})
export const getTextByLang = (codeLang: string | null | undefined, text: string) : string => {
    const textResult = text
        .split(SEPARATORTEXT)
    if (textResult.length > 1){
        const textlang = textResult.reduce<any>((listText, textLang) => {
            const tab = textLang.split(/=(.*)/s)
            return {...listText, [tab[0]]: tab[1]}
        }
        ,{})

            return codeLang ? (textlang[codeLang] ?  textlang[codeLang] : Object.values(textlang)[0] ):  Object.values(textlang)[0]
    }else{
        return text
    }
}

/**
 * For multilang website
 * @returns 
 */
export const useTraductor = () => {


    const dispatch = useDispatch();
    const {multiLang:{currentLang, langList}} = useSelector(mapState);
    const locale=currentLang;



    const setCurrentLangUser = (langKey: string) => {
        dispatch(
            setCurrentLangAction(langKey)
        )
        dispatch(
        setChangedByTheUserAction(true)
        )
    }

    const getListKeyLangAvailable = () =>{
        return langList
    }
        /**
     * Extract the right version of the text from a string text 
     * such as "FR=Bonjour|EN=Hello"
     * @param text 
     * @returns 
     */
    const getTextStringTraduction = (text: string): string => {
        return getTextByLang(locale,text)
    }

    /**
     * Extract the right version of the text from a object text 
     * @param text 
     * @returns 
     */
    const getTextObjectTraduction = (text: {[lang: string]: any}) : any =>  {
        if(locale && text[locale]){
            return text[locale]
        }else{
            return Object.values(text)[0]
        }
    }
    return {
        getTextStringTraduction,
        getTextObjectTraduction,
        setCurrentLangUser,
        locale,
        getListKeyLangAvailable
    }
}

export default useTraductor
