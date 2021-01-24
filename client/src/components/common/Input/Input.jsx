import s from './Input.module.scss'

const Input = ({
    name = '',
    type = 'text',
    placeholder = '',
    className = s.input,
    inputValue = '',
    setInputValue,
    required = false,
}) => (
    <input
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`${className}`}
        required={required}
    />
)

export default Input
