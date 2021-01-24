import {createRef, useState} from 'react'
import s from './LoginForm.module.scss'

const LoginForm = () => {
  const [isEmailHasError,
    setIsEmailHasError] = useState(false)
  const [isPasswordHasError,
    setIsPasswordHasError] = useState(false)

  const emailInputRef = createRef()
  const passwordInputRef = createRef()
  return (
    <form className={`${s.form}`} action="#" method="post">
      <div
        className={`${s.formItem} ${isEmailHasError
        ? s.formValidError
        : ''}`}>
        <label htmlFor="email" className={`${s.formLabel}`}>
          Email
        </label>
        <input type="text" id='email' className={`${s.formInput} `}/>
        <span className={`${s.formError} `}>
          Error
        </span>
      </div>
      <div
        className={`${s.formItem} ${isPasswordHasError
        ? s.formValidError
        : ''}`}>
        <label htmlFor="password" className={`${s.formLabel}`}>Password</label>
        <input type="password" id='password' className={`${s.formInput}`}/>
        <span className={`${s.formError}`}>Error</span>
      </div>

      <div className={`${s.formBtns}`}>
        <button type='submit' className={`${s.formBtn}`}>Login</button>
        <button type='submit' className={`${s.formBtn}`}>Registration</button>
      </div>
    </form>
  )
}

export default LoginForm