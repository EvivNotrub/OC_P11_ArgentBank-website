
import { useState, useCallback, useEffect } from 'react';
// import { useState, useCallback, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { useSelector, useDispatch } from 'react-redux';
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


    // const isAuthorized = useSelector((state) => state.auth.isAuthorized);
    // const hasToken = useSelector((state) => state.auth.hasToken);
    // const rememberMe = useSelector((state) => state.auth.rememberMe);
    const loading = useSelector((state) => state.auth.loading);
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    const signInAction = useCallback(
        async (e) => {        
            e.preventDefault();
            // const email = mailInput;
            // const key = keyInput;
            // const userInfo = {
            //     "email": email,
            //     "password": key
            // }
            // const bodyData = JSON.stringify(userInfo)
            // console.log("bodyData", bodyData);
            const bodyData2 = JSON.stringify({
                "email": e.target.email.value,
                "password": e.target.password.value,
                "firstName": e.target.firstName.value,
                "lastName": e.target.lastName.value,
                "userName": e.target.userName.value
            })
            console.log("bodyData2", bodyData2);
            const response = await postNewUser(bodyData2);
            console.log("response", response);
            if(response.status === 200){
                setValidResponse(true);
            }
        },
        []
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
                    inputName='email'/>
                <Field
                    setValue={setKeyInput}
                    value={keyInput}
                    inputClass='input'
                    labelClass='label bold'
                    labelText='Password'
                    type='password'
                    inputName= 'password'/>
                <Field
                    inputClass="input"
                    labelClass="label bold"
                    labelText="First Name"
                    type="text"
                    id="firstName"
                    inputName="firstName"
                    setValue={setFirstName}
                    value={firstName}
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

// SignInForm.propTypes = {
//     setDisabled: PropTypes.func,
//     disabled: PropTypes.bool,
// }

export default SignUpForm;