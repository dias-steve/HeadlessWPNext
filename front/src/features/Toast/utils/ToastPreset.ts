/*=============================================
=           TOAST PRESET         =
=============================================*/
/**
 * List of toast preset use into the application
 */

//Types 
import { IPresetToast } from "../hook/useToast"


/*=============================================
=           TYPES           =
=============================================*/
export interface IPresetToastDictionnary {
    [key: string]:IPresetToast
}
/*=====  End of TYPES ======*/

/**
 * Taost Preset Dictionary
 */
export const toastPreset = {
    paiment_declined: {
        isPositive: false,
        message: "FR=Désolé, votre moyen de paiement a été refusé|EN=Sorry, your method of payment was refused",
        title:"FR=Paiement refusé|EN=Payment declined",
        withBtnClose: true,
        timeToDisplay: null,
        isScrollUp: false,
    },

    card_no_valid: {
        isPositive: false,
        message: "",
        title:"FR=Carte invalide|EN=Card not valid",
        withBtnClose: true,
        timeToDisplay: null,
        isScrollUp: false,
    },

    no_available_items: {
        isPositive: false,
        message: "FR=Veuillez modifier votre panier svp|EN=Modify your card please",
        title:"FR=Désolé, des articles dans votre panier ne sont plus indisponible, vous ne serez pas prévelé|EN=Sorry, some item are not available, no payment have been processed",
        withBtnClose: true,
        timeToDisplay: null,
        isScrollUp: true,
    },

    internal_Error_no_payment_done: {
        isPositive: false,
        message: "FR=Veuillez réessayer ulterieurement svp|EN=Please, try again later",
        title:"FR=Désolé, une erreur a eu lieu, vous ne serez pas prélevé |EN=Sorry, a error occurred, no payment occurred",
        withBtnClose: true,
        timeToDisplay: null,
        isScrollUp: false,
    },
    internal_Error: {
        isPositive: false,
        message: "FR=Veuillez réessayer ulterieurement svp|EN=Please, try again later",
        title:"FR=Désolé, une erreur a eu lieu |EN=Sorry, a error occurred",
        withBtnClose: true,
        timeToDisplay: null,
        isScrollUp: false,
    },

    form_invalid: {
        isPositive: false,
        title: "FR=Formulaire incomplet|EN=Incomplete Form",
        message:"FR=Veuillez remplir tous les champs obligatoire du formulaire|EN=Please, Check that all required fields have been filled out correctly",
        withBtnClose: false,
        timeToDisplay: 3000,
        isScrollUp: false,
    },

    form_no_shipping_methode_selected: {
        isPositive: false,
        message: "FR=Veuillez choisir un des moyens de livraison diponible |EN=Please, choose one of the means of delivery available",
        title:"FR=Formulaire incomplet|EN=Incomplete Form",
        withBtnClose: false,
        timeToDisplay: 3000,
        isScrollUp: false,
    },

    form_card_name_no_valid: {
        isPositive: false,
        message: "FR=Veuillez entrer un nom de carte valide svp |EN=Please, enter a valid card name",
        title:"FR=Nom de carte invalid|EN=Invalid Card Name",
        withBtnClose: false,
        timeToDisplay: 3000,
        isScrollUp: false,
    },

}