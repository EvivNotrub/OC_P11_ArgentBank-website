

import './navigation.scss';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setUserData } from '../../Redux/userSlice';
import { hasTokenAction, isAuthorizedAction } from '../../Redux/authSlice';
// import { useEffect } from 'react';


function Navigation() {
    const isAuthorized = useSelector((state) => state.auth.isAuthorized);
    const hasToken = useSelector((state) => state.auth.hasToken);
    // const validToken = useSelector((state) => state.auth.validToken);
    const rememberMe = useSelector((state) => state.auth.rememberMe);
    const userName = useSelector((state) => state.user.user);
    const dispatch = useDispatch();


    function logOut(e) {
        e.preventDefault();
        // we only remove isAuthorized from Redux store to be able to control rememberMe
        if(isAuthorized){
            dispatch(isAuthorizedAction(false))
        }
        // we remove token from localStorage only if rememberMe is false
        if(hasToken && !rememberMe){
            window.localStorage.removeItem("token");
            dispatch(hasTokenAction(false))
        }
        dispatch(setUser(null))
        dispatch(setUserData(null))
    }
    const signUp = 'sign-up';
    const signIn = 'sign-in';
    if(!isAuthorized){
        return (
            <div className='header__nav__link-container'>
                <Link className='header__nav__link' to={"/authentification/" + signIn}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    {/* <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                        <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/>
                    </svg>
                    <span>Sign In</span>
                </Link>
                <Link className='header__nav__link' to={"/authentification/" + signUp}>
                    <span>Sign Up</span>
                </Link>
            </div>
        )
    }
    if(isAuthorized === true){
        return(
            <div className='header__nav__link'>
                <Link className='header__nav__link --log-out' to={"/userpage"}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    {/* <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                        <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/>
                    </svg>
                    {userName ? userName : ''}
                </Link>
                <Link onClick={(e) => {logOut(e)}} className='header__nav__link --log-out' to={"/authentification/" + signIn}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        {/*<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->*/}
                        <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/>
                    </svg>
                    <span>Sign Out</span>
                </Link>
            </div>
        )
    }
}

export default Navigation