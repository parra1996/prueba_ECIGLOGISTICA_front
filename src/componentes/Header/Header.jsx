
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGOUT } from '../../redux/types';
import { connect } from 'react-redux';

// import { Button } from '@mantine/core';


import './Header.css';

const Header = (props) => {

    let navigate = useNavigate();

    useEffect(() => {
    })
    
    const navegar = (lugar) => {

        setTimeout(() => {
            navigate(lugar);
        }, 200);
    }

    const logOut = () => {
        props.dispatch({ type: LOGOUT });

        setTimeout(() => {
            navigate("/");
        }, 1500);
    }

    if (!props.credentials?.token) {
        return (
            <div className='header'>
                <div className="headercitos">
                    ECIGLOGISTICA
                </div>
                <div className="headercitos">
                <div color='teal' style={{pointer:'cursor'}} onClick={() => navegar("/login")}>Login</div>&nbsp;
                <div color='teal' style={{pointer:'cursor'}} onClick={() => navegar("/register")}>Register</div> 
                </div>
                <div className="headercitos">
                </div>
            </div>
        )
    } else {
        return (
            <div className='header'>
                <div className="headercitos">
                    ECIGLOGITICA
                </div>
                <div className="headercitos">
                <div color="teal" style={{pointer:'cursor'}} >{props.credentials?.usuario.name} {props.credentials?.usuario.lastName}</div>&nbsp;
                <div color="teal" style={{pointer:'cursor'}} onClick={() => navegar("/")}>Products</div>&nbsp;
                <div color="teal" style={{pointer:'cursor'}} onClick={() => logOut()}>LogOut</div>&nbsp;
                </div>
                <div className="headercitos"></div>
            </div>
        )
    }
}

export default connect((state) => ({
    credentials: state.credentials,
}))(Header);