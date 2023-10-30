import PropTypes from 'prop-types';
import './field.scss';

function Field({...props}) {
    const setInputValue = props.setValue;

    return(
        <label className={props.labelClass}>
            {props.labelText}
            <input
                onChange={(e) => setInputValue(e.target.value)}
                className={props.inputClass}
                id={props.id}
                name={props.inputName}
                type={props.type}
                value={props.value}
                disabled={props.disabled}
            />
            {props.labelTextAfter}
        </label>
    )
}

Field.propTypes = {
        setValue: PropTypes.func,
        value: PropTypes.string,
        labelClass: PropTypes.string,
        inputClass: PropTypes.string,
        labelText: PropTypes.string,
        labelTextAfter: PropTypes.string,
        type: PropTypes.string,
        inputName: PropTypes.string,
        id: PropTypes.string,
        disabled: PropTypes.bool,
}

export default Field

