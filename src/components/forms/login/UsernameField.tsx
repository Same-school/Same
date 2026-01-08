import { useState } from "react"
import styled from '@emotion/styled'

const reservedWords = [
    'admin',
    'root',
    'user',
    'guest',
    'anonymous',
    'moderator',
    'administrator',
    'system',
    'null',
    'undefined'
]

const specialCharsRegex = /[^a-zA-Z0-9_-]/

const FieldWrapper = styled.div`
    width: 100%;
    margin-bottom: ${({ theme }) => theme.spacing.md};
`

const StyledInput = styled.input<{ hasError: boolean }>`
    background-color: ${({ theme, hasError }) =>
    hasError ? theme.colors.bgError : theme.glass.bg};
    border: solid 1px ${({ theme, hasError }) =>
    hasError ? theme.colors.borderError : theme.glass.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    height: ${({ theme }) => theme.input.height};
    padding: 0 18px;
    transition: all ${({ theme }) => theme.transition.fast};
    width: ${({ theme }) => theme.input.width};
    color: ${({ theme }) => theme.colors.textWhite};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    box-shadow: ${({ hasError, theme }) =>
    hasError ? `0 0 0 5px ${theme.colors.errorBoxShadow}` : 'none'};

    &::placeholder {
        color: ${({ theme }) => theme.colors.textPlaceholder};
    }

    &:focus {
        background-color: ${({ theme }) => theme.glass.bgHover};
        border-color: ${({ theme }) => theme.glass.borderHover};
        box-shadow: ${({ theme }) => theme.glass.focusShadow};
    }
`

const ErrorContainer = styled.span`
    display: block;
`

const ErrorMessage = styled.div`
    color: ${({ theme }) => theme.colors.textError};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    width: ${({ theme }) => theme.input.width};
    padding-left: 5px;
`

interface UsernameFieldProps {
    value: string
    onChange: (value: string) => void
    isLogin?: boolean
}

export default function Username({ value, onChange, isLogin }: UsernameFieldProps) {

    const [errors, setErrors] = useState<string[]>([])

    const handleBlur = () => {
        const trimmedValue = value.trim()
        const newErrors: string[] = []

        if (!isLogin) {
                if (trimmedValue === "") {
                    newErrors.push("Required")
                    setErrors(newErrors)
                    return
                }

                if (!/[a-zA-Z]/.test(value)) {
                    newErrors.push("Must include a letter")
                }

                if (trimmedValue.length < 3 || trimmedValue.length > 20) {
                    newErrors.push("3-20 characters")
                }

                if (reservedWords.includes(trimmedValue.toLowerCase())) {
                    newErrors.push("Reserved by system")
                }

                if (specialCharsRegex.test(value)) {
                    newErrors.push("Letters, numbers, - and _ only")
                }

                if (/-{2,}/.test(trimmedValue) || /_{2,}/.test(trimmedValue)) {
                    newErrors.push("No consecutive - or _")
                }
                setErrors(newErrors)
                }
        }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valueNoSpaces = e.target.value.replace(/\s/g, '')
        onChange(valueNoSpaces)
        setErrors([])
    }

    return (
        <FieldWrapper>
            <label>Username</label>
            <StyledInput
                id="username-input"
                type="text"
                name="username"
                placeholder="Username"
                required
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={20}
                hasError={errors.length > 0}
            />
            {!isLogin && errors.length > 0 && (
                <ErrorContainer>
                    {errors.map((err, i) => (
                        <ErrorMessage key={i}>{err}</ErrorMessage>
                    ))}
                </ErrorContainer>
            )}
        </FieldWrapper>
    )
}