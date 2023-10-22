// import { useId } from 'react';
import Field from '../../components/Field/field';
import Button from '../../components/buttons/buttons';
import './authentification.scss'


function Authentification() {

    // const {nameInput, passInput} = useId();

    return (
        <main className="log-in-main">
            <section className='log-in'>
                <div className='log-in__heading'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                            {/* <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                                <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/>
                    </svg>
                    <h1 className='log-in__heading__title'>Sign In</h1>
                </div>
                <form className='log-in__form' id='log-in-form'>
                    <Field inputClass='input' labelClass='label bold' labelText='Username' type='text' inputName='name'/>
                    <Field inputClass='input' labelClass='label bold' labelText='Password' type= 'password' inputName= 'password'/>
                    <Field inputClass='log-in__form__remember' labelClass='label checkbox' labelTextAfter='Remember me' type='checkbox' id='rememberMe' inputName= 'rememberMe'/>
                    <Button className='log-in__form__submit button' type='submit' form='log-in-form' textContent='Sign In'/>
                </form>
            </section>
        </main>
    )
    }

export default Authentification;

// <label htmlFor={nameInput}>Username</label>
// <input id={nameInput} name="name" type="text" />
// <label htmlFor={passInput}>Password</label>
// <input id={passInput} name="pass" type="text" />
// id={nameInput} htmlFor={nameInput}