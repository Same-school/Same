import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import SignupForm from './SignupForm'

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
    max-width: 480px;
    box-sizing: border-box;
    & input, & button {
        width: 100%;
        max-width: 420px;
        box-sizing: border-box;
    }
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

export default function SignupCard() {
    return (
        <Card>
            <Title>Sign Up</Title>
            <SignupForm />
            <FooterText>
                Already have an account?
                <StyledLink to="/login"> <b>Login</b></StyledLink>
            </FooterText>
        </Card>
    )
}