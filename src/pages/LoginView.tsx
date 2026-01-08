import styled from '@emotion/styled'
import LoginCard from '../components/forms/login/LoginCard'

const ViewContainer = styled.div`
    width: 100%;
    max-width: 500px;
    padding: ${({ theme }) => theme.spacing.md};
    box-sizing: border-box;
`

export default function LoginView() {
    return (
        <ViewContainer>
            <LoginCard />
        </ViewContainer>
    )
}