import s from './FormInput.module.scss'
import PropTypes from 'prop-types'

const FormInput = ({
    type,
    name,
    placeholder,
    required,
    onBlur,
    onFocus,
    onChange,
    value,
    errors,
}) => (
    <div className={`${s.item} ${errors?.length ? s.validError : ''}`}>
        <label htmlFor={name} className={`${s.label}`}>
            {name[0].toUpperCase() + name.slice(1)}
        </label>
        <input
            value={value}
            onChange={onChange}
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            className={`${s.input}`}
            onBlur={onBlur}
            onFocus={onFocus}
            required={required}
        />
        <span className={`${s.error}`}>{errors[0]?.message}</span>
    </div>
)

FormInput.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    required: PropTypes.bool,

    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    
    errors: PropTypes.array.isRequired,
}

FormInput.defaultProps = {
    type: 'text',
    name: '',
    placeholder: '',
    required: false,
    value: '',
    errors: [],
}

export default FormInput
