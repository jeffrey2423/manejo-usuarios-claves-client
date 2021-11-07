import React from 'react'
import { Link } from 'react-router-dom';

import './styles/Navbar.css'

import { session } from '../general/general';

export default function Navbar(props) {

    return (
        <React.Fragment>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">Brian Moreno | Nicolas Hurtado | Johan Pino</Link>
                    {session.getItem("token") &&
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    }
                    <div className="offcanvas offcanvas-end " tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            {/* <form className="d-flex">
                                <input className="form-control input-border me-2" type="text" placeholder="Search" aria-label="Search" />
                            </form> */}
                            {/* <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/ssss">
                                        <i className="bi bi-house-fill icon-size" />
                                        Link
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="#">
                                        <i className="bi bi-house-fill icon-size" />
                                        Link
                                    </Link>
                                </li>

                                <li className="nav-item dropdown ">
                                    <Link className="nav-link dropdown-toggle" to="#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-house-fill icon-size" />
                                        Dropdown
                                    </Link>
                                    <ul className="dropdown-menu no-border" aria-labelledby="offcanvasNavbarDropdown">
                                        <li>
                                            <Link className="dropdown-item" to="#">
                                                <i className="bi bi-house-fill icon-size" />
                                                Action
                                            </Link>
                                        </li>
                                        <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                                    </ul>
                                </li>
                            </ul> */}

                        </div>
                        {session.getItem("token") &&
                            <div className="dropup dropdownUser position-absolute bottom-0">
                                <hr className="dropdown-divider" />
                                <Link className="nav-link dropdown-toggle" to="#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {/* <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" /> */}
                                    <i class="bi bi-person-fill icon-size"></i>
                                    {session.token.getItem("user_name")}
                                </Link>
                                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                                    {/* <li><Link className="dropdown-item" to="#">New project...</Link></li>
                                <li><Link className="dropdown-item" to="#">Settings</Link></li>*/}
                                    {/* <li><Link className="dropdown-item" to="#">Perfil</Link></li> */}
                                    {/* <li><hr className="dropdown-divider" /></li>  */}
                                    <li>
                                        <Link onClick={session.destroy} className="dropdown-item" to="">
                                            <i className="bi bi-box-arrow-right icon-size"></i>
                                            Cerrar sesion
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>

                </div>
            </nav>
        </React.Fragment>
    )
}
