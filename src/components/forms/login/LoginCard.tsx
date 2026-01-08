import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import LoginForm from './LoginForm'

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    background-color: ${({ theme }) => theme.glass.bg};
    backdrop-filter: ${({ theme }) => theme.glass.backdrop};
    border: solid 1px ${({ theme }) => theme.glass.border};
    padding: ${({ theme }) => theme.spacing.lg};
    box-shadow: ${({ theme }) => theme.shadow.lg};
    width: 100%;
`

const Title = styled.h1`
    width: 100%;
    margin-bottom: ${({ theme }) => theme.spacing.md};
`

const FooterText = styled.span`
    color: ${({ theme }) => theme.colors.textWhite};
`

const StyledLink = styled(Link)`
    color: ${({ theme }) => theme.colors.textWhite};
    text-decoration: none;
    
    b {
        font-weight: ${({ theme }) => theme.fontWeight.bold};
    }
`

export default function LoginCard() {
    return (
        <Card>
            <Title>Login</Title>
            <LoginForm />
            <FooterText>
                Don't have an account?
                <StyledLink to="/signup"> <b>Sign Up</b></StyledLink>
            </FooterText>
        </Card>
    )
}