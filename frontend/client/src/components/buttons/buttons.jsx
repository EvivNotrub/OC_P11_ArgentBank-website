import PropTypes from 'prop-types';
import './buttons.scss'

function Button({...props}){
    return(
        <button
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
}

export default Button;