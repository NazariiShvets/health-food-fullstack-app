import { useEffect, useState } from 'react'
import useInput from './useInput'

const useInputValidation = (validators = {}) => {
    const { value, isBlured, onChange, onBlur, onFocus } = useInput('')

    const [emailError, setEmailError] = useState({})
    const [maxLengthError, setMaxLengthError] = useState({})
    const [minLengthError, setMinLengthError] = useState({})

    useEffect(() => {
        if (isBlured) {
            for (const validator in validators) {
                if (validators[validator] === false) continue
                switch (validator) {
                    case 'maxLength': {
                        const isMaxLengthError = !(
                            value.length <= validators[validator]
                        )
                        setMaxLengthError({
                            name: validator,
                            message: `Max length is ${validators[validator]} character`,
                            isError: isMaxLengthError,
                        })
                        break
                    }
                    case 'minLength': {
                        const isMinLengthError = !(
                            value.length >= validators[validator]
                        )
                        setMinLengthError({
                            name: validator,
                            message: `Min length is ${validators[validator]} character`,
                            isError: isMinLengthError,
                        })
                        break
                    }
                    case 'isEmail': {
                        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        const isEmail = regex.test(String(value).toLowerCase())
                        setEmailError({
                            name: validator,
                            message: 'Invalid email',
                            isError: !isEmail,
                        })
                        break
                    }

                    default:
                        continue
                }
            }
        }
    }, [isBlured])

    const errors = [emailError, maxLengthError, minLengthError].filter(
        error => error.isError,
    )

    return {
        value,
        onChange,
        isBlured,
        onBlur,
        onFocus,
        errors,
    }
}

export default useInputValidation
