import { useState } from 'react'
import FormInput from '../common/FormInput'
import s from './LoginForm.module.scss'

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const submitHandler = e => {
        e.preventDefault()
        e.stopPropagation()
        console.log(e)
    }
    return (
        <form
            className={`${s.form}`}
            onSubmit={submitHandler}
            action="#"
            method="post"
        >
            <FormInput
                inputValue={email}
                setInputValue={setEmail}
                error={false}
                errorMessage={'Invalid email'}
                name={'Email'}
                type={'email'}
                placeholder={'Enter email'}
                required={true}
            />
            <FormInput
                inputValue={password}
                setInputValue={setPassword}
                name={'Password'}
                type={'password'}
                placeholder={'Enter password'}
                required={true}
            />
            <div className={`${s.formFlexW100}`}>
                <button type="submit" className={`${s.formBtn}`}>
                    Login
                </button>
            </div>
            <div className={`${s.formFlexW100}`}>
                <a className={`${s.formLink}`} href="#">
                    Don't have an account yet?
                </a>
                <a className={`${s.formLink}`} href="#">
                    Forgot your password?
                </a>
            </div>
        </form>
    )
}

export default LoginForm
