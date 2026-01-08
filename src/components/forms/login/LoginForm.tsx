import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import Username from "../login/UsernameField.tsx"
import PasswordFields from "./PasswordField.tsx"
import { LoginUser } from "../../../api/User.ts"
import { useAuth } from "../../../context/AuthContext.tsx"

const StyledForm = styled.form`
    width: 100%;
`

const SubmitButton = styled.button<{ disabled?: boolean }>`
    background-color: ${({ theme }) => theme.glass.bg};
    border: solid 1px ${({ theme }) => theme.glass.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    height: ${({ theme }) => theme.input.height};
    padding: 0 18px;
    transition: all ${({ theme }) => theme.transition.fast};
    width: ${({ theme }) => theme.input.width};
    color: ${({ theme }) => theme.colors.textWhite};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
    opacity: ${({ disabled }) => disabled ? 0.6 : 1};

    &:hover:not(:disabled), &:focus:not(:disabled) {
        background-color: ${({ theme }) => theme.glass.bgHover};
        transform: translateY(-1px);
        box-shadow: ${({ theme }) => theme.shadow.md};
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }
`

const ErrorMessage = styled.div`
    color: ${({ theme }) => theme.colors.textError};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    text-align: center;
`

export default function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const { login } = useAuth()

    const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const response = await LoginUser({
                pseudo: username,
                password: password
            })

            // Get response text first
            const text = await response.text()

            // Try to parse as JSON if there's content
            let data
            if (text) {
                try {
                    data = JSON.parse(text)
                } catch (parseError) {
                    console.error('Failed to parse response:', text)
                    setError("Your username or password is incorrect")
                    setIsLoading(false)
                    return
                }
            }

            if (response.ok) {
                // Check if we have the expected data structure
                if (data && data.token) {
                    login(data.token, data.user)
                    navigate('/')
                } else {
                    console.error('Invalid response structure:', data)
                    setError("Login failed: Invalid server response")
                }
            } else {
                // Handle error responses
                const errorMessage = data?.message || data?.error || `Login failed (${response.status})`
                setError(errorMessage)
            }
        } catch (e) {
            console.error('Login error:', e)
            setError("Network error. Please check your connection and try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <StyledForm onSubmit={HandleSubmit}>
            <Username value={username} onChange={setUsername} isLogin={true}/>
            <PasswordFields
                passwordValue={password}
                confirmValue=""
                onPasswordChange={setPassword}
                onConfirmChange={() => {}}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <SubmitButton type="submit" disabled={isLoading || !username || !password}>
                {isLoading ? 'Logging in...' : 'Login'}
            </SubmitButton>
        </StyledForm>
    )
}