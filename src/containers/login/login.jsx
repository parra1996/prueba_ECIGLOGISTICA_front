import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../../redux/types';
import './login.css'
import { showNotification} from '@mantine/notifications'
import { Button, Input } from '@mantine/core';

const Login = (props) => {

    const navigate = useNavigate()

    const [datosUsuario, setDatosUsuario] = useState({
        email: "",
        password: ""
    });
    const [msgError2, setMsgError2] = useState("");

    const rellenarDatos = (e) => {
        setDatosUsuario({ ...datosUsuario, [e.target.name]: e.target.value })
    };

    const login = async () => {

        try {

            let body = {
                email: datosUsuario.email,
                password: datosUsuario.password
            }
            let resultado = await axios.post("https://eciglogistica-jppl.herokuapp.com/users/login", body);

            if (resultado.data === "Usuario o contraseña inválido") {
                setMsgError2("Usuario o contraseña inválido")
            } else {
                showNotification({
                    color: 'green',
                    transition: 'fade',
                    message: 'Te has logueado con exito',
                    autoClose: 5000,
                })
                props.dispatch({ type: LOGIN, payload: resultado.data });
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }

        } catch (error) {
            setMsgError2(error)
        }
    };


    return (
        <div className='login'>
            <Input type="email" name="email" id="email" placeholder="email" onChange={(e) => { rellenarDatos(e) }} /> <br />
            <Input type="password" name="password" id="password" title="password" placeholder="password" autoComplete="off" onChange={(e) => { rellenarDatos(e); }} />
            {msgError2}<br/>
            <Button
                children="Log In"
                color="red"
                onClick={() => login()}
            />
        </div>
    )
}
export default connect()(Login);