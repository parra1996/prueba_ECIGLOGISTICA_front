
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGOUT } from '../../redux/types';
import { connect } from 'react-redux';



import './Header.css';
import { Button } from '@mantine/core';

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
            navigate("/login");
        }, 1000);
    }

    if (!props.credentials?.token) {
        return (
            <div className='header'>
                <div className="headercitos"
                onClick={() => navegar("/")}
                >
                    ECIGLOGISTICA
                </div>
                <div className="headercitos">
                <Button color='dark' style={{pointer:'cursor'}} onClick={() => navegar("/login")}>Login</Button>&nbsp;
                <Button color='dark' style={{pointer:'cursor'}} onClick={() => navegar("/register")}>Register</Button> 
                </div>
                <div className="headercitos">
                </div>
            </div>
        )
    } else {
        return (
            <div className='header'>
                <div className="headercitos"
                onClick={() => navegar("/")}
                >
                    ECIGLOGISTICA
                </div>
                <div className="headercitos">
                <Button color="dark" >{props.credentials?.usuario.name} {props.credentials?.usuario.lastName}</Button>&nbsp;
                <Button color="dark" style={{pointer:'cursor'}} onClick={() => logOut()}>LogOut</Button>&nbsp;
                {
                    props.credentials.usuario.rol == 1 && <Button color="dark" style={{pointer:'cursor'}} onClick={()=> navegar('/admin')}>Admin</Button>
                }
                </div>
                <div className="headercitos"></div>
            </div>
        )
    }
}

export default connect((state) => ({
    credentials: state.credentials,
}))(Header);