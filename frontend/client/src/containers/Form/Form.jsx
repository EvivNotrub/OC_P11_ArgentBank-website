import Field from '../../components/Field/field';
import Button from '../../components/buttons/buttons';
import './form.scss'

function Form() {

        return (
            <form className='form' id='log-in-form'>
                <Field inputClass='input' labelClass='label bold' labelText='Username' type='text' inputName='name'/>
                <Field inputClass='input' labelClass='label bold' labelText='Password' type= 'password' inputName= 'password'/>
                <Field inputClass='form__remember' labelClass='label checkbox' labelTextAfter='Remember me' type='checkbox' id='rememberMe' inputName= 'rememberMe'/>
                <Button
                    stateChange='log-in'
                    className='form__submit button'
                    type='submit'
                    form='log-in-form'
                    textContent='Sign In'/>
            </form>
        )
}

export default Form;