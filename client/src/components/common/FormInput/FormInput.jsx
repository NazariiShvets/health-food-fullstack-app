import Input from '../Input/Input'
import s from './FormInput.module.scss'

const FormInput = ({
    error = false,
    errorMessage = '',
    name = '',
    ...props
}) => (
    <div className={`${s.item} ${error ? s.validError : ''}`}>
        <label htmlFor={name} className={`${s.label}`}>
            {name}
        </label>
        <Input id={name} name={name} {...props} className={`${s.input}`} />
        <span className={`${s.error}`}>{errorMessage}</span>
    </div>
)

export default FormInput
