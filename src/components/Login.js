import React, { useState } from 'react'

import Input from '../components/Input';
import ChangePassModal from './ChangePassModal';
import ErrorLegend from './ErrorLegend';

import { regularExpressions } from '../general/general';
import { session, showMessage, isNullOrEmptyOrFalse, encryptSha256, changeCursorStyle } from '../general/general';
import { api, requestStatus } from '../api/api';

import './styles/Login.css'

export default function Login() {
    const [inputEmail, ChangeInputEmail] = useState({ value: '', isValid: null });
    const [inputPassword, ChangeInputPassword] = useState({ value: '', isValid: null });
    const [formHasErrors, ChangeFormHasErrors] = useState({ value: false, message: '' });

    const [modalFormHasErrors, ChangeModalFormHasErrors] = useState({ value: false, message: '' });

    const [isOpenChangePassModal, ChangeisOpenChangePassModal] = useState(false);
    const [inputPasswordModal, ChangeInputPasswordModal] = useState({ value: '', isValid: null });
    const [inputMaxLoginModal, ChangeInputMaxLoginModal] = useState({ value: '', isValid: null });
    const [mustChangePassword, ChangeMustChangePassword] = useState(false);

    const OnCloseChangePassModal = () => {
        if (mustChangePassword) {
            ChangeisOpenChangePassModal(false);
            session.destroy();
        } else {
            ChangeisOpenChangePassModal(false);
        }
        ChangeMustChangePassword(false);
    }

    const onSubmitChangePassword = async (e) => {
        e.preventDefault()
        if (isNullOrEmptyOrFalse(inputPasswordModal.isValid) ||
            isNullOrEmptyOrFalse(inputMaxLoginModal.isValid)) {
            ChangeModalFormHasErrors({ value: true, message: "Por favor revise el formulario, contiene errores." })
        } else {
            changeCursorStyle("btnPassModal","wait");
            const user = {
                id: parseInt(session.token.getItem("user_id")),
                password: await encryptSha256(inputPasswordModal.value),
                max_logon_times: inputMaxLoginModal.value
            }
            try {
                const response = await api.userManagement.updatePassword(user)
                if (response.status === requestStatus.error) {
                    ChangeModalFormHasErrors({ value: true, message: response.description })
                } else {
                    showMessage.success(response.description);
                    ChangeisOpenChangePassModal(false);
                    ChangeMustChangePassword(false);
                    window.location.href = '/Home';
                }
            } catch (error) {
                showMessage.error(error.message)
            } finally {
                changeCursorStyle("btnPassModal","pointer");
            }
        }
    }

    const onSubmitLogin = async (e) => {
        e.preventDefault()
        if (isNullOrEmptyOrFalse(inputEmail.isValid) ||
            isNullOrEmptyOrFalse(inputPassword.isValid)) {
            ChangeFormHasErrors({ value: true, message: "Por favor revise el formulario, contiene errores." })
        } else {
            changeCursorStyle("btnLogin","wait");
            const user = {
                email: inputEmail.value,
                password: await encryptSha256(inputPassword.value)
            }
            console.log(user)
            try {
                const response = await api.userManagement.login(user)
                if (response.status === requestStatus.error) {
                    ChangeFormHasErrors({ value: true, message: response.description })
                } else {
                    session.setItem('token', response.token)
                    if (parseInt(session.token.getItem("user_max_logon_times")) <= 0) {
                        ChangeisOpenChangePassModal(true);
                        ChangeMustChangePassword(true);
                    } else {
                        window.location.href = '/Home'
                    }
                }
            } catch (error) {
                showMessage.error(error.message)
            } finally {
                changeCursorStyle("btnLogin","pointer");
            }
        }
    }
    return (
        <React.Fragment>

            <form onSubmit={onSubmitLogin} class="row g-3">
                <div class="col-md-12">
                    <Input
                        id="email"
                        label="Email"
                        type='text'
                        errorText="Debe digitar un email valido"
                        successText=""
                        regularExpression={regularExpressions.email}
                        inputState={inputEmail}
                        inputChangeState={ChangeInputEmail}
                    />
                </div>
                <div class="col-md-12">
                    <Input
                        id="password"
                        label="Clave"
                        type='password'
                        errorText="La clave no puede estar vacia"
                        successText=""
                        regularExpression={regularExpressions.noEmpty}
                        inputState={inputPassword}
                        inputChangeState={ChangeInputPassword}
                    />
                </div>

                <ErrorLegend
                    show={formHasErrors.value}
                    message={formHasErrors.message}
                />

                <div class="col-md-12">
                    <button id="btnLogin" class="btn btn-primary btn-login" type="submit">Inicia sesion</button>
                </div>
            </form>
            <ChangePassModal
                isOpen={isOpenChangePassModal}
                onClose={OnCloseChangePassModal}
                closeTitle={"Cerrar"}
                title={"Superaste el limite de inicios de sesion, debes cambiar la clave"}
                hideAcceptButton={true}
                onSubmit={onSubmitChangePassword}
                inputPasswordModal={inputPasswordModal}
                ChangeInputPasswordModal={ChangeInputPasswordModal}
                passwordRgx={regularExpressions.password}
                inputMaxLoginModal={inputMaxLoginModal}
                ChangeInputMaxLoginModal={ChangeInputMaxLoginModal}
                numbersOnlyRgx={regularExpressions.numbersOnly}
                modalFormHasErrors={modalFormHasErrors}
            />
        </React.Fragment>
    )
}
