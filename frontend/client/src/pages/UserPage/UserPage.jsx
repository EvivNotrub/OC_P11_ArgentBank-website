
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../components/buttons/buttons';
import './userPage.scss'


function UserPage({isAuthorized}) {
    console.log('isAUthori',isAuthorized);
    const [someState, setSomeState] = useState(false);
    console.log('someState',someState);


    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthorized){
            setTimeout(() => {
                navigate('/authentification', { replace: true });
            }, 3000)
        }
    }, [isAuthorized, navigate])

    if(!isAuthorized) {
        return (
            <main className="user-main">
                <h2 className='user-main__alert'>Restricted access :-o</h2>
                <p className='user-main__alert'>You will be redirected to log-in page.</p>
            </main>
        )}
    if(isAuthorized) {
        return (
            <main className="user-main">
                <div>Hello Bob!</div>
                    <Button
                            handleAction={setSomeState}
                            className='log-in__form__submit button'
                            type='submit' form='log-in-form'
                            textContent='Change State'/>
                    {someState &&  <div >Bob</div>}
            </main>
        )
    }
}

UserPage.propTypes = {
    isAuthorized: PropTypes.bool,
}
export default UserPage;