import styled from '@emotion/styled'
import SignupCard from '../components/forms/signup/SignupCard'

const ViewContainer = styled.div`
    width: 100%;
    max-width: 550px;
    padding: ${({ theme }) => theme.spacing.md};
    box-sizing: border-box;
`

export default function SignupView() {
    return (
        <ViewContainer>
            <SignupCard />
        </ViewContainer>
    );
}