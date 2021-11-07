import React, { Component } from 'react'

import './styles/Home.css'

import { session } from '../general/general';

export default class Home extends Component {
    render() {
        return (
            <div className="container home-container">
                <div className="welcome-text">
                    <p class="fs-1">Bienvenid@ {session.token.getItem("user_name")}</p>
                </div>
            </div>
        )
    }
}
