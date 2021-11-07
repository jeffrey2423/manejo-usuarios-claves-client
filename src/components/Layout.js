import React from 'react';
import Navbar from './Navbar'

import './styles/Layout.css';

const Layout = (props) => {
    return (      
        <React.Fragment>
            <Navbar />
            <div className="container contenedor">
                {props.children}
            </div>
        </React.Fragment>
    )
}

export default Layout