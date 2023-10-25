
import PropTypes from 'prop-types';
import Button from '../../components/buttons/buttons';
import './account.scss';

function Account({...props}){

    return (
        <section className={'account' + ' ' + props.className}>
            <div className='account__details'>
                <h3 className="account__details__title">Argent Bank Checking (x8349)</h3>
                <p className="account__details__amount">$2,082.79</p>
                <p className="account__details__description">Available Balance</p>
            </div>
            <div className='account__button--wrapper'>
                <Button
                    // handleAction={() =>  }
                    className='account__button'
                    type='button'
                    textContent='View transactions'/>
            </div>
        </section>
    )
}

Account.propTypes = {
    className: PropTypes.string,
}

export default Account