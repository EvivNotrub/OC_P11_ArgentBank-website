import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthorized } from '../../Redux/userSlice';
import { postCredentials } from '../../api/api';
import Field from '../../components/Field/field';
import Button from '../../components/buttons/buttons';
import './login.scss'

function LogInForm() {
    const [mailInput, setMailInput] = useState('Votre e-mail');
    const [keyInput, setKeyInput] = useState('')
    const [sending, setSending] = useState(false);
    const isAuthorized = useSelector((state) => state.user.isAuthorized)
    const dispatch = useDispatch();


    const logInAction = async (e) => {        
        
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
                console.log(response);
                setSending(false)
                if(!response.ok){
                    alert("HTTP-Error: " + response.status + "\n\n" + "Identifiants incorrect");
                    dispatch(setAuthorized(false))
                }
                if(response.status === 200) {
                    const retourLogin = await response.json();
                    const token = JSON.stringify(retourLogin.body.token);
                    window.localStorage.setItem("token", token)
                    dispatch(setAuthorized(true))
                }
            } catch (error) {
                setSending(false)
                alert('Erreur lors de la connexion au server.')
                throw new Error('Could not reach backend', {cause: error});
            }
        }
    }
    

        return (
            <form onSubmit={logInAction} className='form' id='log-in-form'>
                <Field setValue={setMailInput} value={mailInput} inputClass='input' labelClass='label bold' labelText='User e-mail' type='email' inputName='email'/>
                <Field setValue={setKeyInput} value={keyInput} inputClass='input' labelClass='label bold' labelText='Password' type= 'password' inputName= 'password'/>
                <Field inputClass='form__remember' labelClass='label checkbox' labelTextAfter='Remember me' type='checkbox' id='rememberMe' inputName= 'rememberMe'/>
                <Button
                    className='form__submit button'
                    type='submit'
                    form='log-in-form'
                    textContent='Sign In'/>
                {sending && <p>Sending !</p>}
            </form>
        )
}

export default LogInForm;