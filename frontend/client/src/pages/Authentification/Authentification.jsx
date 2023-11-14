import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogInForm from '../../containers/Forms/LogInForm';
import './authentification.scss'
import SignUpForm from '../../containers/Forms/signUpForm';

function Authentification() {
    const { option } = useParams();
    console.log("option", option);
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    const isAuthorized = useSelector((state) => state.auth.isAuthorized);
    const rememberMe = useSelector((state) => state.auth.rememberMe);
    const userName = useSelector((state) => state.user.user);

    // isAuthorized is set to true if the user sends the valid credentials after valid api response,
    // or if a previously saved token is validated by the API.
    // The second case is managed in UserPage.jsx and there fore LogInForm.jsx
    // navigates to UserPage.jsx if hasToken is true, but userData is not yet present.
        useEffect(() => {
            if(isAuthorized){
                navigate('/userpage', { replace: true });
            }
        }, [isAuthorized, navigate, rememberMe])

        return (
            <main className="log-in-main">
                <section className='log-in'>
                    <div className='log-in__heading'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                {/* <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                                    <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/>
                        </svg>
                        <h2 className='log-in__heading__title'>
                            {
                               (option === 'sign-up') ? ('Sign-Up') : (disabled ? `Welcome ${userName || ''}` : 'Sign In')
                            }
                        </h2>
                    </div>
                    {(option === 'sign-in') && <LogInForm setDisabled={setDisabled} disabled={disabled} />}
                    {(option === 'sign-up') && <SignUpForm />}
                </section>
            </main>
        )
}

export default Authentification;