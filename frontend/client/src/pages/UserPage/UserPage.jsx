
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData, setUser } from '../../Redux/userSlice';
import { getUserProfile } from '../../api/api';
import Button from '../../components/buttons/buttons';
import './userPage.scss'


function UserPage() {
    const isAuthorized = useSelector((state) => state.user.isAuthorized);
    const hasToken = useSelector((state) => state.user.hasToken);
    const userData = useSelector((state) => state.user.userData);
    const userName = useSelector((state) => state.user.user);
    const dispatch = useDispatch();


    const getUserData = useCallback(
        async () => {
                const token = JSON.parse(localStorage.getItem("token"));
                let response = await getUserProfile(token);
                dispatch(setUserData(response.body));
                dispatch(setUser(response.body.userName));
    }, [dispatch])

    useEffect(() => {
        if(isAuthorized === true && hasToken === true){
            getUserData();
        }
    }, [getUserData, hasToken, isAuthorized])

    // here we force navigation to return to login if user is not authorized:
    const navigate = useNavigate();
    useEffect(() => {
        if(!isAuthorized){
            setTimeout(() => {
                navigate('/authentification', { replace: true });
            }, 2000)
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
    if(isAuthorized === true) {
        console.log("userData : ", userData);
        return (
            <main className="user-main">
                <div className="user-main__header">
                    <h2>Welcome back<br/>{userName ? userName : ''} {userData ? userData.lastName : ''}!</h2>
                    <Button
                            // handleAction={() =>  }
                            className='log-in__form__submit button'
                            type='submit' form='log-in-form'
                            textContent='Change State'/>
                </div>
                <div>Hello {userName ? userName : ''} {userData ? userData.lastName : ''}!</div>

                    {/* {someState &&  <div >Bob</div>} */}
            </main>
        )
    }
}

export default UserPage;