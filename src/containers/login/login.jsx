import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../../redux/types';
import './login.css'

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
            let resultado = await axios.post("http://localhost:5000/users/login", body);

            if (resultado.data === "Usuario o contraseña inválido") {
                setMsgError2("Usuario o contraseña inválido")
            } else {
                console.log("te has logueado")
                props.dispatch({ type: LOGIN, payload: resultado.data });
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }

        } catch (error) {
            console.log(error)
        }
    };


    return (
        <div className='login'>
            <input type="email" name="email" id="email" placeholder="email" onChange={(e) => { rellenarDatos(e) }} /> <br />
            <input type="password" name="password" id="password" title="password" placeholder="password" autoComplete="off" onChange={(e) => { rellenarDatos(e); }} />
            {msgError2}
            <div className='boton' onClick={() => { login() }} >
                Login
            </div>
        </div>
    )
}
export default connect()(Login);