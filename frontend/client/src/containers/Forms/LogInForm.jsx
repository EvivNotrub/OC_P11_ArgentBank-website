import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAuth, rememberMeAction } from '../../Redux/authSlice';
import Field from '../../components/Field/field';
import Button from '../../components/buttons/buttons';
import './loginForm.scss'

function LogInForm() {
    const [mailInput, setMailInput] = useState('');
    const [keyInput, setKeyInput] = useState('');
    const isAuthorized = useSelector((state) => state.auth.isAuthorized);
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

            if(keyInput.length < 8){
                alert("Password must be at least 8 characters long");
                return;
            }
            try {
                await dispatch(fetchAuth(bodyData)).unwrap();
            } catch (error) {
                if (error.status === 404) {
                    alert("HTTP-Error: " + error.status + "\n\n Could not reach backend: " + error.statusText);
                }else {
                    alert("HTTP-Error: " + error.status + "\n\n" + error.message);
                }
            }
        },
        [dispatch, keyInput, mailInput]
    )

    
    useEffect(() => {
        if(isAuthorized){
            navigate('/userpage', { replace: true });
        }
    }, [isAuthorized, navigate])


    if(loading === "idle" && !isAuthorized){
        return (
            <form onSubmit={logInAction} className='form' id='log-in-form'>
                <Field
                    setValue={setMailInput}
                    value={mailInput}
                    inputClass='input'
                    labelClass='label bold'
                    labelText='User e-mail'
                    type='email'
                    inputName='email'
                    required={true}
                />
                <Field
                    setValue={setKeyInput}
                    value={keyInput}
                    inputClass='input'
                    labelClass='label bold'
                    labelText='Password'
                    type= 'password'
                    inputName= 'password'
                    required={true}
                />
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