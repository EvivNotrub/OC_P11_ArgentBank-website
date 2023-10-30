import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { unwrapResult } from '@reduxjs/toolkit'
import { fetchAuth } from '../../Redux/authSlice';
import Field from '../../components/Field/field';
import Button from '../../components/buttons/buttons';
import './loginForm.scss'

function LogInForm() {
    const [mailInput, setMailInput] = useState('');
    const [keyInput, setKeyInput] = useState('')
    const isAuthorized = useSelector((state) => state.auth.isAuthorized);
    const loading = useSelector((state) => state.auth.loading);
    const dispatch = useDispatch();

// need to check the dependencies of the callback : dispatch??
    const logInAction = useCallback(
        async (e) => {        
            e.preventDefault();
            const email = mailInput;
            const key = keyInput;
            const userInfo = {
                "email": email,
                "password": key
            }
            const bodyData = JSON.stringify(userInfo)
            // const bodyData2 = JSON.stringify({
            //     "email": e.target.email.value,
            //     "password": e.target.password.value
            // })

            if(!isAuthorized){
                try {
                    await dispatch(fetchAuth(bodyData)).unwrap();
                } catch (error) {
                    if (error.status === 404) {
                        alert("HTTP-Error: " + error.status + "\n\n Could not reach backend: " + error.statusText);
                    }else {
                        alert("HTTP-Error: " + error.status + "\n\n" + error.message);
                    }
                }
            }
        },
        [dispatch, isAuthorized, keyInput, mailInput]
    )

    if(loading === "idle" && !isAuthorized){
        return (
            <form onSubmit={logInAction} className='form' id='log-in-form'>
                <Field setValue={setMailInput} value={mailInput} inputClass='input' labelClass='label bold' labelText='User e-mail' type='email' inputName='email'/>
                <Field setValue={setKeyInput} value={keyInput} inputClass='input' labelClass='label bold' labelText='Password' type= 'password' inputName= 'password'/>
                <Field inputClass='form__remember' labelClass='label checkbox' labelTextAfter='Remember me' type='checkbox' id='rememberMe' inputName= 'rememberMe'/>
                <Button
                    className='form__submit'
                    type='submit'
                    form='log-in-form'
                    textContent='Sign In'/>
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

export default LogInForm;