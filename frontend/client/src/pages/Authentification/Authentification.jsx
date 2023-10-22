import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './authentification.scss'
import { useSelector } from 'react-redux';
import Form from '../../containers/Form/Form';

function Authentification() {
        const isAuthorized = useSelector((state) => state.user.isAuthorized);
        console.log(isAuthorized);

        const navigate = useNavigate();

        useEffect(() => {
            if(isAuthorized){ // === true ??
                navigate('/userpage', { replace: true });
            }
        }, [isAuthorized, navigate])

        return (
            <main className="log-in-main">
                <Form />
            </main>
        )
}

export default Authentification;