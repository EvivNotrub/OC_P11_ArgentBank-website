import PropTypes from 'prop-types';
import './buttons.scss'

function Button({...props}){


    const handleClick = (e) => {
        if(props.setIsAuthorized){
            props.setIsAuthorized(true)
        }
        if(props.handleAction){
            props.handleAction(true)
        }

    }

    return(
        <button
            onClick={(e) => {
                e.preventDefault();
                handleClick(e)
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
    form: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    textContent: PropTypes.string,
    setIsAuthorized: PropTypes.func,
    handleAction: PropTypes.func,
}

export default Button;