import { useState } from "react"
import styled from '@emotion/styled'

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

interface PasswordFieldsProps {
    passwordValue: string
    confirmValue: string
    onPasswordChange: (value: string) => void
    onConfirmChange: (value: string) => void
}

export default function PasswordFields({
                                           passwordValue,
                                           onPasswordChange,
                                       }: PasswordFieldsProps) {
    const [passwordErrors] = useState<string[]>([])

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onPasswordChange(e.target.value)
    }

    return (
        <>
            <FieldWrapper>
                <label>Password</label>
                <StyledInput
                    type="password"
                    value={passwordValue}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    hasError={passwordErrors.length > 0}
                />
            </FieldWrapper>
        </>
    )
}