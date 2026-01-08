import styled from '@emotion/styled'
import SignupCard from '../components/forms/signup/SignupCard'

const ViewContainer = styled.div`
    width: 100%;
    min-height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 550px;
    padding: ${({ theme }) => theme.spacing.md};
    box-sizing: border-box;
    margin: 0 auto;
`

export default function SignupView() {
    return (
        <ViewContainer>
            <SignupCard />
        </ViewContainer>
    );
}