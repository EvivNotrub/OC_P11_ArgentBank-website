import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthorized, setValidToken, setRememberMe, setUserData, setUser, setHasToken } from '../../Redux/userSlice';
import { postCredentials, getUserProfile } from '../../api/api';
import Field from '../../components/Field/field';
import Button from '../../components/buttons/buttons';
import './loginForm.scss'

function LogInForm() {
    const [mailInput, setMailInput] = useState('');
    const [keyInput, setKeyInput] = useState('')
    const [sending, setSending] = useState(false);
    const isAuthorized = useSelector((state) => state.user.isAuthorized)
    const hastoken = useSelector((state) => state.user.hasToken)
    const rememberMe = useSelector((state) => state.user.rememberMe)
    const dispatch = useDispatch();


    useEffect(() => {
        console.log("rememberMe in useEffect", rememberMe);
    }, [rememberMe])

    const dispatchUserData = useCallback(
        async () => {
            console.log('dispatchUserData');
        const response = await getUserProfile();
        console.log('response in dispatchUserData', response);
        if(response.status !== 200){
            alert("HTTP-Error: " + response.status + "\n\n" + response.message);
            dispatch(setValidToken(false))
            dispatch(setHasToken(false))
        }
        if(response.status === 200) {
            dispatch(setAuthorized(true))
            dispatch(setValidToken(true))
        }
        dispatch(setUserData(response.body));
        dispatch(setUser(response.body.userName));
    }, [dispatch])

    const sendCredentials = useCallback(
        async (bodyData) => {
            console.log('sendCredentials');
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
                        dispatch(setHasToken(true))
                    }
                } catch (error) {
                    setSending(false)
                    alert('Erreur lors de la connexion au server.')
                    throw new Error('Could not reach backend', {cause: error});
                }
        }, [dispatch])

    

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
                console.log('!isAuthorized');
                // here dispatchUserData will set hasToken to falls if the token is not valid
                hastoken ? dispatchUserData() : (await sendCredentials(bodyData), dispatchUserData());
            }
        },
        [dispatchUserData, hastoken, isAuthorized, keyInput, mailInput, sendCredentials]
    )

    const handleRememberMe = useCallback(
        () => {
            dispatch(setRememberMe(!rememberMe))
        }, [dispatch, rememberMe])

    useEffect(() => {
        if(!rememberMe){
            window.localStorage.removeItem("token");
            dispatch(setHasToken(false));
            dispatch(setValidToken(false));
        }
    }, [dispatch, rememberMe])


        if(!sending){
            return (
                <form onSubmit={logInAction} className='form' id='log-in-form'>
                    <Field disabled={hastoken} setValue={setMailInput} value={mailInput} inputClass='input' labelClass='label bold' labelText='User e-mail' type='email' inputName='email'/>
                    <Field disabled={hastoken} setValue={setKeyInput} value={keyInput} inputClass='input' labelClass='label bold' labelText='Password' type= 'password' inputName='password'/>
                    <Field checkbox={true} value={rememberMe} checked={rememberMe} setValue={handleRememberMe} inputClass='form__remember' labelClass='label checkbox' labelTextAfter='Remember me' type='checkbox' id='rememberMe' inputName='rememberMe'/>
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