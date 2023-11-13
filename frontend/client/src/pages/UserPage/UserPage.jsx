
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData, setUser } from '../../Redux/userSlice';
import { validTokenAction, hasTokenAction, isAuthorizedAction } from '../../Redux/authSlice';
import { getUserProfile } from '../../api/api';
import EditNameForm from '../../containers/Forms/EditNameForm';
import Button from '../../components/buttons/buttons';
import Account from '../../containers/account/Account';
import './userPage.scss'


function UserPage() {
    const [edit, setEdit] = useState(false);
    const isAuthorized = useSelector((state) => state.auth.isAuthorized);
    const hasToken = useSelector((state) => state.auth.hasToken);
    const validToken = useSelector((state) => state.auth.validToken);
    const rememberMe = useSelector((state) => state.auth.rememberMe);
    const userData = useSelector((state) => state.user.userData);
    const dispatch = useDispatch();

    // here we set the accounts data, in a real app it would be fetched from the API
    const accounts = [
        {
            "accountName": 'Argent Bank Checking (x8349)',
            "balance": '2,082.79',
            "balanceType": 'Available Balance',
        },
        {
            "accountName": 'Argent Bank Savings (x6712)',
            "balance": '10,928.42',
            "balanceType": 'Available Balance',
        },
        {
            "accountName": 'Argent Bank Credit Card (x8349)',
            "balance": '184.30',
            "balanceType": 'Current Balance',
        },
    ]

    const dispatchUserData = useCallback(
        async () => {
        const response = await getUserProfile();
        //here we only set validToken=true if the API response is ok:
        // if we authorize the user directly, he/she will not have the chance to log out and change the rememberMe option
        // isAuthorized is set to true only if the user clickes on the logIn button and a 200 response is received,
        // wich depends on whether hasToken istrue or not. 
        if(hasToken && response.status === 200){
            dispatch(validTokenAction(true));
        }
        if(rememberMe && response.status !== 200){
            // validToken is set to false, the user will be redirected to login page
            // Important to change hasToken as well since this function is called only if hasToken is true
            window.localStorage.removeItem("token");
            dispatch(validTokenAction(false));
            dispatch(hasTokenAction(false));
            alert("Your token is not valid anymore. \nPlease log in again.");
        }
        dispatch(setUserData(response.body));
        dispatch(setUser(response.body.userName));
    }, [dispatch, hasToken, rememberMe])


    // here we get the user data from the API if the token is present.
    // TWO WAYS hasToken can be true:
    // the loginForm using the fetchAuth (in authSlice) wif api response 200
    // or the user has checked rememberMe previously and the token is still present.
    useEffect(() => {
        if(hasToken){
            const storedToken = JSON.parse(localStorage.getItem("token"));
            if(storedToken){
                dispatchUserData();
            } else {
                dispatch(hasTokenAction(false))
            }
        }
    }, [dispatch, dispatchUserData, hasToken, isAuthorized])

    // here we force navigation to return to login if user is not authorized:
    const navigate = useNavigate();
    useEffect(() => {
        if(!isAuthorized){
            setTimeout(() => {
                navigate('/authentification/sign-in', { replace: true });
            }, 1300)
        }
    }, [isAuthorized, navigate])

    // here the previously validated token from a 200 response will controle authorization: 
    useEffect(() => {
        if(validToken){
            dispatch(isAuthorizedAction(true));
        }
    }, [dispatch, validToken])

    // here it is important to check if the token has been removed from localStorage
    // and set to notValid since it controls the authorization.
    // (navigation will remove token if rememberMe is false)
    useEffect(() => {
        if(!hasToken){
            dispatch(validTokenAction(false));
        }
    }, [dispatch, hasToken])

    // here we return different content based on authorization:
    if(!isAuthorized) {
        return (
            <main className="user-main">
                <h2 className='user-main__alert'>Restricted access</h2>
                <p className='user-main__alert'>You will be redirected to log-in page.</p>
            </main>
        )}    
    return (
        <main className="user-main">
            {edit?
                <div className="user-main__header edit-form">
                    <h2>Edit user info</h2>
                    <EditNameForm setEdit={setEdit}/>
                </div>
                :
                <div className="user-main__header edit-button">
                    <h2>Welcome back<br/>{userData ? userData.firstName : ''} {userData ? userData.lastName : ''}!</h2>
                    <Button
                        handleAction={() => setEdit(true) }
                        type='button'
                        textContent='Edit Name'/>
                </div>  
            }
            <div className="user-main__accounts">
                {accounts.map((account) => (
                    <Account key={account.balance + account.accountName} name={account.accountName} balance={account.balance} balanceType={account.balanceType} className='user-main__accounts__account' />
                ))
                }
            </div>
        </main>
    )

}

export default UserPage;