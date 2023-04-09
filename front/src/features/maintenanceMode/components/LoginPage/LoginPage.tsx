import React from 'react'
import LoginForm from '../LoginForm/LoginForm'
import styles from './LoginPage.module.scss'
function LoginPage() {
  return (
    <div className={styles.global_comtainer}>
        <img  className={styles.img}src={'./icon-systeme.svg'} alt={'system-icon'}/>
        <LoginForm />
    </div>
  )
}

export default LoginPage
