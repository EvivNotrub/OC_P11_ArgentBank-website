
import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData, setUser } from '../../Redux/userSlice';
import { getUserProfile } from '../../api/api';
import EditNameForm from '../../containers/Forms/EditNameForm';
import Button from '../../components/buttons/buttons';
import Account from '../../containers/account/Account';
import './userPage.scss'


function UserPage() {
    const [edit, setEdit] = useState(false);
    const isAuthorized = useSelector((state) => state.auth.isAuthorized);
    const hasToken = useSelector((state) => state.auth.hasToken);
    const userData = useSelector((state) => state.user.userData);
    const dispatch = useDispatch();

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
        dispatch(setUserData(response.body));
        dispatch(setUser(response.body.userName));
    }, [dispatch])

    useEffect(() => {
        if(isAuthorized && hasToken){
            dispatchUserData();
        }
    }, [dispatchUserData, hasToken, isAuthorized])

    // here we force navigation to return to login if user is not authorized:
    const navigate = useNavigate();
    useEffect(() => {
        if(!isAuthorized){
            setTimeout(() => {
                navigate('/authentification', { replace: true });
            }, 1300)
        }
    }, [isAuthorized, navigate])

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