/*=============================================
=            NEWSLETTER PRESENTATIONAL COMPONENTS          =
=============================================*/
/**
 * Module manage the newletter feature
 */

//Libraries
import React from "react";

//Styles
import styles from "./Newsletter.module.scss";
import {
  ModalNewLetterViewProps,
  WidgetNewLetterViewProps,
  withNewsletterContainer,
} from "./NewsletterContainer";
import BtnPrimary from "@/components/atoms/btn/BtnPrimary/BtnPrimary";
import InputField from "@/components/molecules/Form/InputFields/InputField";
import BtnDynamic from "@/components/atoms/btn/BtnDynamic/BtnDynamic";
import useTraductor from "@/features/multiLang/hooks/useTraductor";

/**
 *
 * @param param0
 * @returns
 */
export const NewsletterWidget = ({
  message,
  handleClickOpen,
  handleClickClose,
  isWillBeKilled,
  btnLabel,
  withClose,
  beCentered
}: WidgetNewLetterViewProps) => {
  return (
    <div
      className={[
        styles.widget_global_container,
        isWillBeKilled ? styles.hide : styles.show, beCentered ? styles.centered : styles.not_centered
      ].join(" ")}
    >
      <div className={styles.text_wrapper}>
        <span
          className={[styles.text, styles.text_1].join(" ")}
          dangerouslySetInnerHTML={{ __html: message + "&nbsp;" }}
        />
        <span
          className={[styles.text, styles.text_2].join(" ")}
          dangerouslySetInnerHTML={{ __html: message + "&nbsp;" }}
        />
      </div>
      <div className={styles.btn_wrapper}>
        <BtnPrimary
          available={true}
          handleClick={handleClickOpen}
          label={btnLabel}
          grayColor={false}
          link={null}
          withClose={withClose}
          style={{}}
          handleClickClose={handleClickClose}
   
        />
      </div>
    </div>
  );
};

/**
 *
 * @param param0
 * @returns
 */
export const NewsletterModal = ({
  isWillBeKilled,
  handleClickClose,
  handleClickSubscribe,
  available,
  isloading,
  isValidate,
  message,
  handleChangeMail,
  handleChangeName,
  messageErrorMail,
  messageErrorName,
  nameValue,
  mailValue,
  status,
  title
}: ModalNewLetterViewProps) => {
  const {getTextStringTraduction} = useTraductor()
  return (
    <div
      className={[
        styles.modal_global_container,
        isWillBeKilled ? styles.hide : styles.show,
      ].join(" ")}
    >
      <div className={styles.modal_wrapper_content}>
        <img
          className={styles.icon_mail}
          src={"/white-mail.svg"}
          alt={"mail icon"}
        />
        <div
          onClick={() => {
            handleClickClose();
          }}
          className={styles.close_btn}
        >
          <img
            className={styles.icon_close}
            src={"/icon-cross-white.svg"}
            alt={"close icon"}
          />
        </div>
        <h1 className={styles.title} dangerouslySetInnerHTML={{__html:title}}/>
         

        <form className={styles.form_wrapper}>
          <InputField
            value={nameValue}
            setChange={(e: any) => {
              handleChangeName(e);
            }}
            label={getTextStringTraduction("FR=Nom|EN=Name")}
            errorMessage={messageErrorMail !== '' ? {message: messageErrorName} : null}
            type={"text"}
            blackStyle={true}
          />
          <InputField
            value={mailValue}
            setChange={(e: any) => {
              handleChangeMail(e);
            }}
            label={"Email"}
            errorMessage={messageErrorMail !== '' ? {message: messageErrorMail} : null}
            type={"text"}
            blackStyle={true}
          />
          <div className={styles.btn_wrapper}>
            <BtnDynamic
              label={getTextStringTraduction("FR=Envoyer|EN=Send")}
              isLoading={isloading}
              available={available}
              handleClick={(e) => {
                e.preventDefault();
                handleClickSubscribe();
              }}
              validationLabel={message}
              isValidate={isValidate}
              isSubmitBtn={true}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export const Newsletter = ({labelBtn, message, centerBtn}:{labelBtn?: string, message?: string, centerBtn?: boolean}) => {
  const Container = withNewsletterContainer(NewsletterWidget, NewsletterModal, labelBtn, message, centerBtn);
  return (
    <Container />
  )
}
export default Newsletter
