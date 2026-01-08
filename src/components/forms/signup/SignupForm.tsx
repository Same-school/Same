import { type FormEvent, useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
// import { useForm } from 'react-hook-form'
import Username from "./Username.tsx"
import EmailField from "./EmailField.tsx"
import FirstNameField from "./FirstNameField.tsx"
import LastNameField from "./LastNameField.tsx"
import BirthdateField from "./BirthdateField.tsx"
import PasswordFields from "./PasswordFields.tsx"
import { PostUser, type PostUserProps } from '../../../api/User.ts'

const StyledForm = styled.form`
    width: 100%;
`

const MultiFieldRow = styled.fieldset`
    width: 100%;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    display: flex;
    justify-content: space-between;
`

const SubmitButton = styled.button`
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

    &:hover, &:focus {
        background-color: ${({ theme }) => theme.glass.bgHover};
        transform: translateY(-1px);
        box-shadow: ${({ theme }) => theme.shadow.md};
    }

    &:active {
        transform: translateY(0);
    }
`

export default function SignupForm() {
    // const form = useForm()
    // const { handleSubmit } = form
    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [birthdate, setBirthdate] = useState({ month: '', day: '', year: '' })
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const HandleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const User:PostUserProps = {
            birthdate: `${birthdate.year}-${birthdate.month.padStart(2, '0')}-${birthdate.day.padStart(2, '0')}`,
            firstName: firstName,
            lastName: lastName,
            pseudo: username,
            email: email,
            password: password,
            genderId: 0,
            schoolId: 0,
            professionId: 0
        }
        try {
            await PostUser(User);
            alert("You account has been successfully created");
            navigate('/login');
        }
        catch (e) {
            console.error(e)
        }
    }

    return (
        <StyledForm method="post" onSubmit={HandleSubmit}>
            <Username value={username} onChange={setUsername}/>
            <EmailField value={email} onChange={setEmail}/>
            <MultiFieldRow>
                <FirstNameField value={firstName} onChange={setFirstName}/>
                <LastNameField value={lastName} onChange={setLastName}/>
            </MultiFieldRow>
            <BirthdateField value={birthdate} onChange={setBirthdate}/>
            <PasswordFields
                passwordValue={password}
                confirmValue={confirmPassword}
                onPasswordChange={setPassword}
                onConfirmChange={setConfirmPassword}
                username={username}
                firstName={firstName}
                lastName={lastName}
                email={email}
                birthdate={birthdate}
            />
            <SubmitButton onClick={() => HandleSubmit} type="submit">Submit</SubmitButton>
        </StyledForm>
    )
}