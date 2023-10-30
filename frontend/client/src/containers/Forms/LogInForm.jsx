import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthorized, setValidToken } from '../../Redux/userSlice';
import { postCredentials } from '../../api/api';
import Field from '../../components/Field/field';
import Button from '../../components/buttons/buttons';
import './loginForm.scss'

function LogInForm() {
    const [mailInput, setMailInput] = useState('');
    const [keyInput, setKeyInput] = useState('')
    const [sending, setSending] = useState(false);
    const isAuthorized = useSelector((state) => state.user.isAuthorized)
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

            setSending(true)

            if(!isAuthorized){
                try {
                    let response = await postCredentials(bodyData)
                    setSending(false)
                    if(!response.ok){
                        alert("HTTP-Error: " + response.status + "\n\n" + "Identifiants incorrect");
                        dispatch(setAuthorized(false))
                    }
                    const contentType = response.headers.get("content-type")
                    if(!contentType || !contentType.includes("application/json")){
                        throw new TypeError("Did not received Json!")
                    }
                    if(response.status === 200) {
                        dispatch(setAuthorized(true))
                        const retourLogin = await response.json();
                        const token = JSON.stringify(retourLogin.body.token);
                        window.localStorage.setItem("token", token)
                        dispatch(setValidToken(true))
                    }
                } catch (error) {
                    setSending(false)
                    alert('Erreur lors de la connexion au server.')
                    throw new Error('Could not reach backend', {cause: error});
                }
            }
        },
        [dispatch, isAuthorized, keyInput, mailInput]
    )


        if(!sending){
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
        if(sending){
            return (
                <div className='loader'>
                    <div className='loader__spinner'>
                    </div>                   
                </div>
            )
        }
}

export default LogInForm;