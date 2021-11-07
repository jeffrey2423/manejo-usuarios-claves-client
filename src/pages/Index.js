import React, { Component } from 'react'
import SignUpForm from '../components/SignUpForm'
import Login from '../components/Login'

import './styles/Index.css'

export default class index extends Component {
    render() {
        return (
            <div className="container tabs-index">
                <div className="tabs-index-content">
                    <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Registrate</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Inicia sesion</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab"><SignUpForm /></div>
                        <div className="tab-pane" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"><Login /></div>
                    </div>
                </div>
            </div>
        )
    }
}
