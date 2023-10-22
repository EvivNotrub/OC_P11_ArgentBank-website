import PropTypes from 'prop-types';
// import { useSelector, useDispatch } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setAuthorized } from '../../Redux/userSlice'; 
import './buttons.scss'

function Button({...props}){
    // const isAuthorized = useSelector((state) => state.user.isAuthorized);
    const dispatch = useDispatch();

    const handleClick = () => {
        if(props.handleAction){
            props.handleAction(true)
        }
        if(props.stateChange === 'log-in'){
            dispatch(setAuthorized(true));
        }

    }

    return(
        <button
            onClick={(e) => {
                e.preventDefault();
                handleClick()
            }}
            className={props.className}
            form={props.form?props.form:''}
            type={props.type}
        >
            {props.textContent}
        </button>
    )
}
Button.propTypes = {
    stateChange: PropTypes.string,
    form: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    textContent: PropTypes.string,
    handleAction: PropTypes.func,
}

export default Button;