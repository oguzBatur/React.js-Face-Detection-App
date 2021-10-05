import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import logo from './logo.png';

const Logo = () => {
    return(

        <div className='ma4 mt0'>
        <Tilt className='Tilt'>
            <div className='logo-container'>
                <img className='logo'src={logo} alt='brain'/>
            </div>
        </Tilt>
        </div>
    )
}

export default Logo;