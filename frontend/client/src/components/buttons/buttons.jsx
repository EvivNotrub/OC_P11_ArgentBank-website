import PropTypes from 'prop-types';
import './buttons.scss'

function Button({...props}){

    return(
        <button
            onClick={props.handleAction}
            className={'button' + ' ' + props.className}
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
    handleAction: PropTypes.func,
}

export default Button;