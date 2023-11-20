
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { hasTokenAction, rememberMeAction } from '../../Redux/authSlice';
import { setUser, setUserData } from '../../Redux/userSlice';
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
    const rememberMe = useSelector((state) => state.auth.rememberMe);
    const hasToken = useSelector((state) => state.auth.hasToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loading = useSelector((state) => state.auth.loading);

    const signInAction = useCallback(
        async (e) => {        
            e.preventDefault();
            if(keyInput.length < 8){
                alert("Password must be at least 8 characters long");
                return;
            }
            if(rememberMe || hasToken){
                dispatch(rememberMeAction(false));
                dispatch(hasTokenAction(false));
                dispatch(setUser(null))
                dispatch(setUserData(null))
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
            console.log("response   ", response);
            if(response.status === 200){
                setValidResponse(true);
            }
            if(response.status !== 200){
                alert(response)
            }
        },
        [dispatch, firstName, keyInput, lastName, mailInput, rememberMe, userName]
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