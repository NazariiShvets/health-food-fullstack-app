import useInputValidation from '../../hooks/useInputValidation'
import FormInput from '../common/FormInput/FormInput'
import s from './LoginForm.module.scss'

const LoginForm = () => {
    const email = useInputValidation({
        isEmail: true,
    })
    const password = useInputValidation({
        minLength: 6,
        maxLength: 20,
    })
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
                {...email}
                name={'email'}
                required={true}
            />
            <FormInput
                {...password}
                name={'password'}
                type={'password'}
                required={true}
            />
            <div className={`${s.formFlexW100}`}>
                <button type="submit" className={`${s.formBtn}`}>
                    Login
                </button>
            </div>
            <div className={`${s.formFlexW100}`}>
                <a className={`${s.formLink}`} href="/registation">
                    Don't have an account yet?
                </a>
                <a className={`${s.formLink}`} href="/refresh_password">
                    Forgot your password?
                </a>
            </div>
        </form>
    )
}

export default LoginForm
