import React, { useState } from 'react'

import Input from '../components/Input'
import ErrorLegend from './ErrorLegend';
import SuccessLegend from './SuccessLegend';

import { regularExpressions, showMessage, isNullOrEmptyOrFalse, encryptSha256, changeCursorStyle } from '../general/general';
import { api, requestStatus } from '../api/api';

import './styles/SignUpForm.css'

export default function SignUpForm() {

    const [inputEmail, ChangeInputEmail] = useState({ value: '', isValid: null });
    const [inputName, ChangeInputName] = useState({ value: '', isValid: null });
    const [inputPassword, ChangeInputPassword] = useState({ value: '', isValid: null });
    const [inputPassword2, ChangeInputPassword2] = useState({ value: '', isValid: null });
    const [inputMaxLogin, ChangeInputMaxLogin] = useState({ value: '', isValid: null });

    const [formHasErrors, ChangeFormHasErrors] = useState({ value: false, message: '' });
    const [signUpSuccess, ChangeSignUpSuccess] = useState({ value: false, message: '' });

    const validarPassword2 = () => {
        if (inputPassword.value !== inputPassword2.value) {
            ChangeInputPassword2((prevState) => {
                return { ...prevState, isValid: false }
            });
        } else {
            ChangeInputPassword2((prevState) => {
                return { ...prevState, isValid: true }
            });
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (isNullOrEmptyOrFalse(inputEmail.isValid) ||
            isNullOrEmptyOrFalse(inputName.isValid) ||
            isNullOrEmptyOrFalse(inputPassword.isValid) ||
            isNullOrEmptyOrFalse(inputPassword2.isValid) ||
            isNullOrEmptyOrFalse(inputMaxLogin.isValid)) {
            ChangeFormHasErrors({ value: true, message: "Por favor revise el formulario, contiene errores." })
        } else {
            changeCursorStyle("btnSignUp","wait");
            const user = {
                email: inputEmail.value,
                name: inputName.value,
                password: await encryptSha256(inputPassword.value),
                max_logon_times: inputMaxLogin.value
            }
            try {
                const response = await api.userManagement.signUp(user)
                if (response.status === requestStatus.error) {
                    ChangeSignUpSuccess({ value: false, message: "" })
                    ChangeFormHasErrors({ value: true, message: response.description })
                } else {
                    ChangeFormHasErrors({ value: false, message: "" })
                    ChangeSignUpSuccess({ value: true, message: response.description })
                }
            } catch (error) {
                showMessage.error(error.message)
            }finally{
                changeCursorStyle("btnSignUp","pointer");
            }
        }
    }

    return (
        <React.Fragment>
            <form onSubmit={onSubmit} class="row g-3">
                <div class="col-md-5">
                    <Input
                        id="email-signUp"
                        label="Email"
                        type='text'
                        errorText="Debe digitar un email valido"
                        successText="Bien hecho!"
                        regularExpression={regularExpressions.email}
                        inputState={inputEmail}
                        inputChangeState={ChangeInputEmail}
                    />
                </div>
                <div class="col-md-4">
                    <Input
                        id="name"
                        label="Nombre"
                        type='text'
                        errorText="El nombre es obligatorio"
                        successText="Bien hecho!"
                        regularExpression={regularExpressions.noEmpty}
                        inputState={inputName}
                        inputChangeState={ChangeInputName}
                    />
                </div>
                <div class="col-md-3">
                    <Input
                        id="max-login"
                        label="Inicios de sesion"
                        type='number'
                        errorText="Solo se permiten numeros"
                        successText="Bien hecho!"
                        regularExpression={regularExpressions.numbersOnly}
                        inputState={inputMaxLogin}
                        inputChangeState={ChangeInputMaxLogin}
                        tooltip="Numero maximo de inicios de sesion antes de exigir que el usuario deba cambiar la contraseña."
                    />
                </div>
                <div class="col-md-6">
                    <Input
                        id="password-signUp"
                        label="Clave"
                        type='password'
                        errorText="La clave debe tener minimo 6 caracteres y hacer uso de mayúsculas y minúsculas, un número y un caracter especial"
                        successText="Bien hecho!"
                        regularExpression={regularExpressions.password}
                        inputState={inputPassword}
                        inputChangeState={ChangeInputPassword}
                    />
                </div>
                <div class="col-md-6">
                    <Input
                        id="password2"
                        label="Confirmar clave"
                        type='password'
                        errorText="Ambas contraseñas deben ser iguales."
                        successText="Bien hecho!"
                        regularExpression=""
                        inputState={inputPassword2}
                        inputChangeState={ChangeInputPassword2}
                        ValidSecondPassword={validarPassword2}
                    />
                </div>

                <ErrorLegend
                    show={formHasErrors.value}
                    message={formHasErrors.message}
                />
                <SuccessLegend
                    show={signUpSuccess.value}
                    message={signUpSuccess.message}
                />

                <div class="col-md-12">
                    <button id="btnSignUp" class="btn btn-primary btn-signup" type="submit">Registrate</button>
                </div>
            </form>
        </React.Fragment>
    )
}
