/*=============================================
=        COUNTRY SELECT INPUT               =
=============================================*/
/**
 * Dropdow with the list of country
 */

//Libraries
import React from 'react'
//Components
import { CountryDropdown } from 'react-country-region-selector'

import styles from './CountrySelectInput.module.scss'

/**
 * Dropdow with the list of country
 * @param param0 
 * @returns 
 */
function CountrySelectInput({setChange, value, errorMessage, label} : {setChange: any, value: any, errorMessage: string| null , label: string}) {
  return (
    <div className={styles.global_container} >
        <span className={styles.label} >{label}</span>

    <div className={styles.wrapper_drop}>
      <img className={styles.arrow_icon} src={'/arrow-down.svg'} alt={'arrow down icon'} />
    <CountryDropdown
        valueType="short"
        defaultOptionLabel={"Selectionner un pays"}
        showDefaultOption={false}
        priorityOptions={["FR"]}
        onChange= {
            (v) =>{
              setChange(v)}
        }
        value={value}
    />
    </div> 

    
    </div>
  )
}

export default CountrySelectInput