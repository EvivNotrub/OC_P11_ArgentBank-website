import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData, setUser } from '../../Redux/userSlice';
import { putUserInfo } from '../../api/api.js';
import Button from '../../components/buttons/buttons';
import Field from '../../components/Field/field';
import PropTypes from 'prop-types';
import "./editNameForm.scss";


function EditNameForm(props) {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.userData);
    const [userNameInput, setUserNameInput] = useState('');
    const [firstNameInput, setFirstNameInput] = useState('');
    const [lastNameInput, setLastNameInput] = useState('');


    const setEdit = props.setEdit;
    
    async function changeUserName(e, name) {
        e.preventDefault();
        const response = await putUserInfo(name);
        setEdit(false);
        if(response.status === 200) {
            alert(response.message + '\nUser name changed to ' + name);
            dispatch(setUser(response.body.userName));
            dispatch(setUserData(response.body));
        }
        if(!response.status){
            alert(response);
        }
    }

    useEffect(() => {
        if(userData){
            setUserNameInput(userData.userName);
            setFirstNameInput(userData.firstName);
            setLastNameInput(userData.lastName);
        }
    }, [userData])

    return (
    <form className='user-edit' onSubmit={(e) => changeUserName(e,userNameInput)} id='edit-name-form'>
        <Field setValue={setUserNameInput} value={userNameInput} inputClass='input' labelClass='label bold' labelText='User Name' type='text' inputName='userName'/>
        {/* Below we need to create the api-routes to be able to change names
            don't forget to delete disabled={true}*/}
        <Field disabled={true} setValue={setFirstNameInput} value={firstNameInput} inputClass='input' labelClass='label bold' labelText='First Name' type='text' inputName='firstName'/>
        <Field disabled={true} setValue={setLastNameInput} value={lastNameInput} inputClass='input' labelClass='label bold' labelText='Last Name' type='text' inputName='lastName'/>
        <div className='user-edit__buttons'>
            <Button
                form='edit-name-form'
                type='submit'
                textContent='Save'/>
            <Button
                handleAction={() => setEdit(false) }
                type='button'
                textContent='Cancel'/>
        </div>
    </form>
  );
}

EditNameForm.propTypes = {
    setEdit: PropTypes.func,
}

export default EditNameForm;