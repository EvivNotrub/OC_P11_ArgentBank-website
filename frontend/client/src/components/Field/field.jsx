import PropTypes from 'prop-types';
import './field.scss';

function Field({...props}) {

    return(
        <label className={props.labelClass}>
            {props.labelText}
            <input className={props.inputClass} id={props.id} name={props.inputName} type={props.type} />
            {props.labelTextAfter}
        </label>
    )
}

Field.propTypes = {
        labelClass: PropTypes.string,
        inputClass: PropTypes.string,
        labelText: PropTypes.string,
        labelTextAfter: PropTypes.string,
        type: PropTypes.string,
        inputName: PropTypes.string,
        id: PropTypes.string,
}

export default Field

