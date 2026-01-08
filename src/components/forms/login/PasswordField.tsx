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

const ErrorContainer = styled.span`
    display: block;
`

const ErrorMessage = styled.div`
    color: ${({ theme }) => theme.colors.textError};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    width: ${({ theme }) => theme.input.width};
    padding-left: 5px;
`

const sequences = [
    'abcdefghijklmnopqrstuvwxyz',
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    '0123456789',
    'qwertyuiopasdfghjklzxcvbnm',
    'QWERTYUIOPASDFGHJKLZXCVBNM'
]

const specialCharsRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/

interface PasswordFieldsProps {
    passwordValue: string
    confirmValue: string
    onPasswordChange: (value: string) => void
    onConfirmChange: (value: string) => void
    username?: string
    firstName?: string
    lastName?: string
    email?: string
    birthdate?: { month: string; day: string; year: string }
}

export default function PasswordFields({
                                           passwordValue,
                                           confirmValue,
                                           onPasswordChange,
                                           onConfirmChange,
                                           username = '',
                                           firstName = '',
                                           lastName = '',
                                           email = '',
                                           birthdate = { month: '', day: '', year: '' }
                                       }: PasswordFieldsProps) {
    const [passwordErrors, setPasswordErrors] = useState<string[]>([])
    const [confirmErrors, setConfirmErrors] = useState<string[]>([])

    const checkConsecutiveRepeated = (password: string): boolean => {
        for (let i = 0; i < password.length - 2; i++) {
            if (password[i] === password[i + 1] && password[i] === password[i + 2]) {
                return true
            }
        }
        return false
    }

    const checkSequentialChars = (password: string): boolean => {
        for (const sequence of sequences) {
            for (let i = 0; i < sequence.length - 2; i++) {
                const subSeq = sequence.substring(i, i + 3)
                const reverseSeq = subSeq.split('').reverse().join('')
                if (password.toLowerCase().includes(subSeq.toLowerCase()) ||
                    password.toLowerCase().includes(reverseSeq.toLowerCase())) {
                    return true
                }
            }
        }
        return false
    }

    const checkContainsPersonalInfo = (password: string): string[] => {
        const violations = []
        const lowerPassword = password.toLowerCase()

        if (username && username.length >= 3 && lowerPassword.includes(username.toLowerCase())) {
            violations.push("user's name")
        }
        if (firstName && firstName.length >= 3 && lowerPassword.includes(firstName.toLowerCase())) {
            violations.push("firstName")
        }
        if (lastName && lastName.length >= 3 && lowerPassword.includes(lastName.toLowerCase())) {
            violations.push("lastName")
        }
        if (email && email.length >= 3) {
            const emailParts = email.toLowerCase().split('@')
            if (emailParts[0].length >= 3 && lowerPassword.includes(emailParts[0])) {
                violations.push("email address")
            }
        }
        if (birthdate && (birthdate.year || birthdate.month || birthdate.day)) {
            const { year, month, day } = birthdate
            if (year && month && day) {
                if (year && lowerPassword.includes(year)) violations.push("birthdate (year)")
                if (month && lowerPassword.includes(month.padStart(2, '0'))) violations.push("birthdate (month)")
                if (day && lowerPassword.includes(day.padStart(2, '0'))) violations.push("birthdate (day)")
            }
        }

        return violations
    }

    const handlePasswordBlur = () => {
        const trimmedValue = passwordValue.trim()
        const newErrors: string[] = []
    }

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
                    onBlur={handlePasswordBlur}
                    placeholder="Password"
                    hasError={passwordErrors.length > 0}
                />
            </FieldWrapper>
        </>
    )
}