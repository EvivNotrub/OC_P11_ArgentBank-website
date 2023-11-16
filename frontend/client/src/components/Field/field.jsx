import PropTypes from 'prop-types';
import './field.scss';

function Field({...props}) {
    const setInputValue = props.setValue;
    return(
        <label className={props.labelClass}>
            {props.labelText}
            {props.checkbox ?
                <input
                    onChange={(e) => setInputValue(e.target.checked)}
                    className={props.inputClass}
                    id={props.id}
                    name={props.inputName}
                    type={props.type}
                    value={props.checked}
                    disabled={props.disabled}
                    checked={props.checked}
                />
                 : 
                <input
                    onChange={(e) => setInputValue(e.target.value)}
                    className={props.inputClass}
                    id={props.id}
                    name={props.inputName}
                    type={props.type}
                    value={props.value}
                    disabled={props.disabled}
                    checked={props.checked}
                    required={props.required}
                />
            }
                
            {props.labelTextAfter}
        </label>
    )
}

Field.propTypes = {
    radio: PropTypes.bool,
    required: PropTypes.bool,
    checkbox: PropTypes.bool,
    checked: PropTypes.bool,
    setValue: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        ]),
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

