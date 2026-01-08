import styled from '@emotion/styled'
import LoginCard from '../components/forms/login/LoginCard'

const ViewContainer = styled.div`
    width: 100%;
    min-height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 500px;
    padding: ${({ theme }) => theme.spacing.md};
    box-sizing: border-box;
    margin: 0 auto;
`

export default function LoginView() {
    return (
        <ViewContainer>
            <LoginCard />
        </ViewContainer>
    )
}