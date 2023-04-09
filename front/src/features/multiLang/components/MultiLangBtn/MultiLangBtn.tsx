import React from 'react';
import styles from './MultiLangBtn.module.scss'
import useTraductor from '../../hooks/useTraductor';
import { v4 as uuidv4 } from 'uuid';


export default function MultiLangBtn() {


    const{getListKeyLangAvailable, setCurrentLangUser, locale} = useTraductor()
    const handleClickLang = (keyLang:string) => {
        setCurrentLangUser(keyLang)
    }
    const listLang = getListKeyLangAvailable();
  return (
    <div >
      {listLang && 
      listLang.map(langkey => (<span className={[styles.btnLang, locale!==langkey ? styles.show : styles.hide].join(' ')} key={uuidv4()}onClick={() => {handleClickLang(langkey)}}>{langkey}</span>))}
    </div>
  )
}
