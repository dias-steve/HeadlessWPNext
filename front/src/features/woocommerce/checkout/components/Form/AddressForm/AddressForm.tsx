import CountrySelectInput from '@/components/molecules/Form/CountrySelectInput/CountrySelectInput'
import InputField from '@/components/molecules/Form/InputFields/InputField'
import React from 'react'
import useCheckout from '../../../hooks/useCheckout';
import useTraductor from '@/features/multiLang/hooks/useTraductor';
import styles from './AddressForm.module.scss'

function AddressForm({label, keyValueStore}: {label: string, keyValueStore: string}) {
  const {getPropsFormFields} = useCheckout();
  const { getTextStringTraduction} = useTraductor();
  return (
    <div className={styles.global_container}>
          <h2 className={styles.title}>{label}</h2>
          <InputField type={'text'} label ={getTextStringTraduction('FR=Prénom|EN=First name')}
          {...getPropsFormFields([keyValueStore,'first_name'])}/>

          <InputField type={'text'} label ={getTextStringTraduction('FR=Nom|EN=Last name')}
          {...getPropsFormFields([keyValueStore,'last_name'])}/>

          <InputField type={'text'} label ={getTextStringTraduction('FR=N° et voie |EN=Address line 1')}
          {...getPropsFormFields([keyValueStore,'address_1'])}/>

          <InputField type={'text'} label ={getTextStringTraduction('FR= Ligne adresse suplémentaire (facultatif) |EN=Address line 2 (optional)')}
          {...getPropsFormFields([keyValueStore,'address_2'])}/>

          <InputField type={'text'} label ={getTextStringTraduction('FR=Ville|EN=City')}
          {...getPropsFormFields([keyValueStore,'city'])}/>

          <InputField type={'text'} label ={getTextStringTraduction('FR=Département|EN=State')}
          {...getPropsFormFields([keyValueStore,'state'])}/>

          <InputField type={'text'} label ={getTextStringTraduction('FR=Code Postal |EN=Zip Code')}
          {...getPropsFormFields([keyValueStore,'postcode'])}/>

          <CountrySelectInput label={getTextStringTraduction('FR=Pays |EN=Country')}
          {...getPropsFormFields([keyValueStore,'country'])} />


    </div>
  )
}

export default AddressForm