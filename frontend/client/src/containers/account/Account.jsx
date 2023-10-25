
import PropTypes from 'prop-types';
import Button from '../../components/buttons/buttons';
import './account.scss';

function Account({...props}){

    return (
        <section className={'account' + ' ' + props.className}>
            <div className='account__details'>
                <h3 className="account__details__title">{props.name}</h3>
                <p className="account__details__amount">${props.balance}</p>
                <p className="account__details__description">{props.balanceType}</p>
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
    name: PropTypes.string,
    balance: PropTypes.string,
    balanceType: PropTypes.string,
}

export default Account