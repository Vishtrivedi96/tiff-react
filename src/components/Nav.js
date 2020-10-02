import React from 'react';
import logo from '../images/tiff-logo.png'

const Nav = () => {
    return (
        <nav>
            <div className="nav-wrapper container s4">
                <a className="brand-logo center" href="https://www.tiff.net/" aria-label="Click here to visit Toronto International Film Festival website">
                    <span>TIFF</span>
                    <img className="hide" alt="Toronto International Film Festival Logo" src={logo}/>
                </a>
            </div>
        </nav>
    )
}

export default Nav;