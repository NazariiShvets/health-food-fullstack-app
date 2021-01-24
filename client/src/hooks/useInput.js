import { useState } from 'react'

const useInput = ({ defaultValue = '' }) => {
    const [value, setValue] = useState(defaultValue)
    const [isBlured, setIsBlured] = useState(false)

    const onChange = e => setValue(e.target.value)

    const onBlur = () => setIsBlured(true)

    const onFocus = () => setIsBlured(false)

    return {
        value,
        onChange,
        isBlured,
        onBlur,
        onFocus,
    }
}

export default useInput
