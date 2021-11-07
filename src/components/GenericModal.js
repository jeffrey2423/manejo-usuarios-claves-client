import React from 'react'

import './styles/GenericModal.css'

export default function GenericModal(props) {
    if (!props.isOpen) {
        return null;
    }
    return (
        <React.Fragment>
            <div className="modal" tabindex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">{props.title}</h5>
                            <button onClick={props.onClose} type="button" className="btn-close" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {props.children}
                        </div>
                        <div className="modal-footer">
                            <button onClick={props.onClose} type="button" className="btn btn-secondary">{props.closeTitle}</button>
                            {!props.hideAcceptButton &&
                                <button onClick={props.onAccept} type="button" className="btn btn-primary">{props.acceptTitle}</button>
                            }                           
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
