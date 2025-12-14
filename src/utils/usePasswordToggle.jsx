import { useState } from "react"

export function usePasswordToggle() {
    const [showPassword, setShowPassword] = useState()

    const togglePassword = () => {
        setShowPassword(prev => !prev)
    }

    return {
        showPassword,
        togglePassword,
        inputType: showPassword ? "text" : "password",
    }
}
