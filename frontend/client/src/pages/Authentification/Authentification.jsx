import { useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogInForm from '../../containers/Forms/LogInForm';
import './authentification.scss'
import SignUpForm from '../../containers/Forms/signUpForm';
import { getUserProfile } from '../../api/api';
import { setUserData, setUser } from '../../Redux/userSlice';
import { validTokenAction, hasTokenAction, isAuthorizedAction, rememberMeAction } from '../../Redux/authSlice';


function Authentification() {

    const hasToken = useSelector((state) => state.auth.hasToken);
    const validToken = useSelector((state) => state.auth.validToken);
    const { option } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthorized = useSelector((state) => state.auth.isAuthorized);
    const userName = useSelector((state) => state.user.user);

    const dispatchUserData = useCallback(
        async () => {
        const response = await getUserProfile();
        //here we only set validToken=true if the API response is ok:
        if(response.status === 200){
            dispatch(validTokenAction(true));
        }
        if(response.status !== 200){
            console.log('response', response);
            // validToken is set to false, the user will be redirected to login page
            // Important to change hasToken as well since this function is called only if hasToken is true
            window.localStorage.removeItem("token");
            window.sessionStorage.removeItem("token");
            dispatch(validTokenAction(false));
            dispatch(hasTokenAction(false));
            dispatch(isAuthorizedAction(false));
            dispatch(setUser(null));
            dispatch(setUserData(null));
            dispatch(rememberMeAction(false));
            alert(`${response}\n\nYou will be redirected to login page.`);
        }
        dispatch(setUserData(response.body));
        dispatch(setUser(response.body.userName));
    }, [dispatch])


    // here the previously validated token from a 200 response will controle authorization: 
    useEffect(() => {
        if(validToken){
            dispatch(isAuthorizedAction(true));
        }
    }, [dispatch, validToken])

    
    // here we get the user data from the API if the token is present.
    // TWO WAYS hasToken can be true:
    // the loginForm using the fetchAuth (in authSlice) wif api response 200
    // or the user has checked rememberMe previously and the token is still present.
    // rememberMe is set to true if the user checks the checkbox in the LogInFOrm component.
    useEffect(() => {
        if(hasToken){
            dispatchUserData();
        }
    }, [dispatch, dispatchUserData, hasToken])

    // isAuthorized is set to true if the user sends the valid credentials after valid api response,
    // or if a previously saved token is validated by the API.
    useEffect(() => {
        if(isAuthorized){
            navigate('/userpage', { replace: true });
        }
    }, [isAuthorized, navigate])

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
                               (option === 'sign-up') ? ('Sign-Up') : (userName ? `Welcome ${userName}` : 'Sign In')
                            }
                        </h2>
                    </div>
                    {(option === 'sign-in') && <LogInForm />}
                    {(option === 'sign-up') && <SignUpForm />}
                </section>
            </main>
        )
}

export default Authentification;