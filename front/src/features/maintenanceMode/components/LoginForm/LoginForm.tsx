import React, { useState, useEffect } from "react";


import styles from "./LoginForm.module.scss";

import { useDispatch, useSelector } from "react-redux";
import BtnPrimary from "../BtnPrimary/BtnPrimary";
import InputField from "../InputFields/InputField";
import { IStore } from "@/redux/rootReducer";
import { setIsAuthmaintenanceModeAction, setdateAuthAction } from "../../redux/maintenanceModeSlice";
import Spinner from "../Spinner/Spinner";

const mapState = (state : IStore) => ({
  modeMaintenance: state.modeMaintenance
 
});
export default function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({text: "", is_error: false});
  const [btnActived, setBtnActived] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {modeMaintenance: {is_auth}} = useSelector(mapState);

  const dispatch = useDispatch();
  const handleDisconnect = () => {
    dispatch(
      setIsAuthmaintenanceModeAction(false)
    )
    setBtnActived(false);
  }

  const isValid = () => {
    if(id!=='' && password !==''){
      return true;
    }else{
      return false;
    }
  }
  useEffect(() => {
    if(isValid()){
      setBtnActived(true);
    }else{
      setBtnActived(false);
    }
  },[id, password]);

  useEffect(() => {
    if(is_auth){
      setMessage({text: "", is_error: false});
      setBtnActived(true);
    }
  }, [])

  const cleanFeilds = () => {
    setId("");
    setPassword("");
  }
  const handleClick = () => {

    if(isValid()){
      setIsLoading(true);
      setMessage({text: "", is_error: false});
      sendID(id, password);
      
    }
  }

 const sendID  = async ( id: string , mdp : string) => {

    const bodyToSend= {
        user: id,
        mdp: mdp
    }

    const results = await fetch(process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/frontaccessauth", {
        // Adding method type
        method: "POST",
        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(bodyToSend)
      })
      .then((response) => response.json())
      .then((response) => 
      {
        if(response.is_auth){
          setIsLoading(false);
  
          
          dispatch(
            setIsAuthmaintenanceModeAction(true)
          )
          const today = Number(new Date().toJSON().slice(0,10).replace(/-/g,''))-1;
          dispatch(
            setdateAuthAction(today)
          )
          setMessage({
            is_error: false, text: ""
          })

          cleanFeilds();
         
        }else{
          setIsLoading(false);
          setMessage({
            is_error: true, text: "Aucun billet d&#39accès correspondant à cet identifiant et ce mot de passe"
          })
          
         

        }
  
      })
  
     .catch((err)=> {
          return {error: true, message: err.message}
        
        });
}



  return (
    <div className={[styles.global_container, isLoading ? styles.min : styles.max].join(' ')}>
  


      { isLoading ? <div className={styles.loading_container}> <div className={styles.spinner_wrapper}><Spinner blackCircle={false}/></div></div>:
      
      !is_auth ?
      <>
            { message?.text &&<p className={[styles.message, message. is_error ? styles.error:" "].join(" ")} dangerouslySetInnerHTML={{__html: message.text}}/>}
       <form>
      <div className={styles.form_wrapper}>
       
        <div
          className={[styles.input_wrapper, styles.input_id_wrapper].join(" ")}
        >
  
          <InputField
            label={"Identifiant"}
            setChange={(e: any) => {
              setId(e);
            }}
            type="text"
            value={id}
          />
        </div>

        <div
          className={[styles.input_wrapper, styles.input_id_wrapper].join(" ")}
        >
          <InputField
            label={"Mot de passe"}
            setChange={(e:any) => {
              setPassword(e);
            }}
            value={password}
            type="password"
          />
        </div>
   
      </div>
       <div className={styles.btn_wrapper}>
      <BtnPrimary
          label={'Se connecter'}
          handleClick={(e) => {
            console.log('connecter')
            e.preventDefault();
            handleClick();
          }}
          available={btnActived}
          isSubmitBtn={true}
          
        />
        </div>
        </form>
        
        </>: 
       <>
        <div className={styles.btn_wrapper}>
        <BtnPrimary
        label={'Aller à l&#39accueil'}
          link={'/'}
          available={true}
      />
        </div>
       <div className={styles.btn_wrapper}>
        <BtnPrimary
          label={'Se déconnecter'}
          handleClick={(e) => {
            e.preventDefault();
            handleDisconnect();
          }}
          available={true}
          grayColor={true}
        />
           </div>

      </>
}
    </div>
  );
}
