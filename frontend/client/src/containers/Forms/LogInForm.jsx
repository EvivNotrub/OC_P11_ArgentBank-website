import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAuth, rememberMeAction } from '../../Redux/authSlice';
import Field from '../../components/Field/field';
import Button from '../../components/buttons/buttons';
import './loginForm.scss'

function LogInForm({setDisabled, disabled}) {
    const [mailInput, setMailInput] = useState('');
    const [keyInput, setKeyInput] = useState('');
    const isAuthorized = useSelector((state) => state.auth.isAuthorized);
    const hasToken = useSelector((state) => state.auth.hasToken);
    const rememberMe = useSelector((state) => state.auth.rememberMe);
    const loading = useSelector((state) => state.auth.loading);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRememberMeChange = () => {
        dispatch(rememberMeAction(!rememberMe));
      };

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
            if(!isAuthorized && rememberMe && hasToken){
                // here we do not authorize the user directly, since userPage is
                // not rendering and getting userData from the API without a valid token.
                // It also allows the user to log out and change the rememberMe option
                navigate('/userpage', { replace: true });
            }
            // below the || !rememberMe condition is necessary to avoid the user getting stuck
            // after using the rememberMe option and then logging out
            // we choose not to delete the token from localStorage in order to be able to
            // re-check rememberMe option.
            if(!isAuthorized && (!hasToken || !rememberMe)){
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
        [dispatch, hasToken, isAuthorized, keyInput, mailInput, navigate, rememberMe]
    )

    useEffect(() => {
        if(!isAuthorized && hasToken && rememberMe){
            setDisabled(true);
        }
        if(!rememberMe){
            setDisabled(false);
        }
    }, [hasToken, isAuthorized, rememberMe, setDisabled])

    if(loading === "idle" && !isAuthorized){
        return (
            <form onSubmit={logInAction} className='form' id='log-in-form'>
                <Field
                    disabled={disabled}
                    setValue={setMailInput}
                    value={mailInput}
                    inputClass='input'
                    labelClass='label bold'
                    labelText='User e-mail'
                    type='email'
                    inputName='email'/>
                <Field
                    disabled={disabled}
                    setValue={setKeyInput}
                    value={keyInput}
                    inputClass='input'
                    labelClass='label bold'
                    labelText='Password'
                    type= 'password'
                    inputName= 'password'/>
                <Field
                    inputClass="form__remember"
                    labelClass="label checkbox"
                    labelTextAfter="Remember me"
                    type="checkbox"
                    id="rememberMe"
                    inputName="rememberMe"
                    setValue={handleRememberMeChange}
                    checkbox={true}
                    checked={rememberMe}
                />
                <Button
                    className='form__submit'
                    type={'submit'}
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

LogInForm.propTypes = {
    setDisabled: PropTypes.func,
    disabled: PropTypes.bool,
}

export default LogInForm;