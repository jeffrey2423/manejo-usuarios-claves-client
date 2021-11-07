import React from 'react'

import GenericModal from './GenericModal';
import Input from '../components/Input';
import ErrorLegend from './ErrorLegend';


export default function ChangePassModal(props) {

    return (
        <GenericModal
            isOpen={props.isOpen}
            onClose={props.onClose}
            onAccept={props.onAccept}
            closeTitle={props.closeTitle}
            acceptTitle={props.acceptTitle}
            title={props.title}
            hideAcceptButton={props.hideAcceptButton}
        >
            <form class="row g-3" onSubmit={props.onSubmit}>
                <div class="col-md-8">
                    <Input
                        id="password"
                        label="Clave"
                        type='password'
                        errorText="La clave debe tener minimo 6 caracteres y hacer uso de mayúsculas y minúsculas, un número y un caracter especial"
                        successText="Bien hecho!"
                        regularExpression={props.passwordRgx}
                        inputState={props.inputPasswordModal}
                        inputChangeState={props.ChangeInputPasswordModal}
                    />
                </div>
                <div class="col-md-4">
                    <Input
                        id="max-login"
                        label="Inicios de sesion"
                        type='number'
                        errorText="Solo se permiten numeros"
                        successText="Bien hecho!"
                        regularExpression={props.numbersOnlyRgx}
                        inputState={props.inputMaxLoginModal}
                        inputChangeState={props.ChangeInputMaxLoginModal}
                        tooltip="Numero maximo de inicios de sesion antes de exigir que el usuario deba cambiar la contraseña."
                    />
                </div>
                <ErrorLegend
                    show={props.modalFormHasErrors.value}
                    message={props.modalFormHasErrors.message}
                />
                <div class="col-md-12">
                    <button id="btnPassModal" class="btn btn-primary" type="submit">Cambiar clave</button>
                </div>
            </form>
        </GenericModal>
    )
}
