import React, { useEffect, useState } from 'react'

import './styles/Input.css'

export default function Input(props) {

    const inputTypeNumber = ["e", "E", "+", "-", "."];
    const [inputClass, ChangeinputClass] = useState("");

    useEffect(() => {
        if (props.inputState.isValid === true) {
            ChangeinputClass('is-valid')
        } else if (props.inputState.isValid === false) {
            ChangeinputClass('is-invalid')
        }
    }, [props.inputState.isValid]);

    const OnChange = (e) => {
        props.inputChangeState({ ...props.inputState, value: e.target.value })
    }

    const Validation = () => {
        if (props.regularExpression) {
            if (props.regularExpression.test(props.inputState.value)) {
                props.inputChangeState({ ...props.inputState, isValid: true })
            } else {
                props.inputChangeState({ ...props.inputState, isValid: false })
            }
        }

        if (props.ValidSecondPassword) {
            props.ValidSecondPassword();
        }
    }
    return (
        <React.Fragment>
            <label htmlFor={props.id} class="form-label" >
                {props.tooltip &&
                    <i title={props.tooltip} className="bi bi-info-circle icon-size" />
                }
                {props.label}
            </label>
            <input
                class={`form-control ${inputClass}`}
                id={props.id}
                type={props.type}
                value={props.inputState.value}
                onChange={OnChange}
                onKeyUp={Validation}
                onBlur={Validation}
                onKeyDown={props.type === 'number' ? e => inputTypeNumber.includes(e.key) && e.preventDefault() : undefined}
            />
            <div class="valid-feedback">
                {props.successText}
            </div>
            <div class="invalid-feedback">
                {props.errorText}
            </div>
        </React.Fragment>
    )
}
