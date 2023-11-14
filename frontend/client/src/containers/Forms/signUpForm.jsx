
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { postNewUser } from '../../api/api';
import Field from '../../components/Field/field';
import Button from '../../components/buttons/buttons';
import './loginForm.scss'

function SignUpForm() {
    const [mailInput, setMailInput] = useState('');
    const [keyInput, setKeyInput] = useState('');
    const [validResponse, setValidResponse] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    const loading = useSelector((state) => state.auth.loading);

    const signInAction = useCallback(
        async (e) => {        
            e.preventDefault();
            if(keyInput.length < 8){
                alert("Password must be at least 8 characters long");
                return;
            }
            const userInfo = {
                "email": mailInput,
                "password": keyInput,
                "firstName": firstName,
                "lastName": lastName,
                "userName": userName
            }
            const bodyData = JSON.stringify(userInfo)
            const response = await postNewUser(bodyData);
            if(response.status === 200){
                setValidResponse(true);
            }
        },
        [firstName, keyInput, lastName, mailInput, userName]
    )

    useEffect(() => {
        if(validResponse){
            navigate('/authentification/sign-in', { replace: true });
        }
    }, [navigate, validResponse])

    if(loading === "idle" && !validResponse){
        return (
            <form onSubmit={signInAction} className='form' id='log-in-form'>
                <Field
                    setValue={setMailInput}
                    value={mailInput}
                    inputClass='input'
                    labelClass='label bold'
                    labelText='Your e-mail'
                    type='email'
                    inputName='email'
                    required={true} />
                <Field
                    setValue={setKeyInput}
                    value={keyInput}
                    inputClass='input'
                    labelClass='label bold'
                    labelText='Password'
                    type='password'
                    inputName= 'password'
                    required={true}/>
                <Field
                    inputClass="input"
                    labelClass="label bold"
                    labelText="First Name"
                    type="text"
                    id="firstName"
                    inputName="firstName"
                    setValue={setFirstName}
                    value={firstName}
                    required={true}
                />
                <Field
                    inputClass="input"
                    labelClass="label bold"
                    labelText="Last Name"
                    type="text"
                    id="lastName"
                    inputName="lastName"
                    setValue={setLastName}
                    value={lastName}
                    required={true}
                />
                <Field
                    inputClass="input"
                    labelClass="label bold"
                    labelText="User Name"
                    type="text"
                    id="userName"
                    inputName="userName"
                    setValue={setUserName}
                    value={userName}
                    required={true}
                />                
                <Button
                    className='form__submit'
                    type={'submit'}
                    form='log-in-form'
                    textContent='Sign Up'/>
            </form>
        )
    }
    if(loading === "pending"){
        return (
            <div className='loader'>
                <div className='loader__spinner'>
                </div>                   
            </div>
        )
    }
}

export default SignUpForm;