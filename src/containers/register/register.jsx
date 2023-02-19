import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkError } from '../../tools';
import './register.css';
import {Button, Input} from '@mantine/core'
import { showNotification } from '@mantine/notifications';

const Register = () => {

    const navigate = useNavigate();

    const [datosUsuario, setDatosUsuario] = useState({
        name: "", lastName: "",  email: "",
        password: "", password2: "",
    });

    const [msgError, setMsgError] = useState("");

    const registrame = async () => {

        setMsgError("");
        let error = "";

        let arrayCampos = Object.entries(datosUsuario);

        if (datosUsuario.password !== datosUsuario.password2) {

            return (setMsgError("Los dos contraseñas deben de coincidir"));

        } else {
            setMsgError("");
        }

        for (let elemento of arrayCampos) {
            error = checkError(elemento[0], elemento[1]);

            if (error !== "ok") {
                setMsgError(error);
                return;
            };
        };
        let body = {
            name: datosUsuario.name,
            lastName: datosUsuario.lastName,
            email: datosUsuario.email,
            password: datosUsuario.password,
        }
        try {

            let resultado = await axios.post("http://localhost:5000/users/register", body);

            if (resultado.data.error) {

                setMsgError(resultado.data.error);

            } else {
                showNotification({
                    color: 'green',
                    transition: 'fade',
                    message: 'Te has registrado con exito',
                    autoClose: 5000,
                })
            }

            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (error) {
            setMsgError(error);
        }
    }
    
    const rellenarDatos = (e) => {
        setDatosUsuario({
            ...datosUsuario,
            [e.target.name]: e.target.value
        })
    };

    return (
        <div className='register'>
            <Input  style={{ padding: '.5em' }} name="name" placeholder="name" onChange={(e) => { rellenarDatos(e) }}/>
            <Input  style={{ padding: '.5em' }} name="lastName" placeholder="lastName" onChange={(e) => { rellenarDatos(e) }}/>
            <Input  style={{ padding: '.5em' }} name="email" placeholder="email" onChange={(e) => { rellenarDatos(e) }}/>
            <Input  style={{ padding: '.5em' }} name="password" placeholder="password" onChange={(e) => { rellenarDatos(e) }}/>
            <Input  style={{ padding: '.5em' }} name="password2" placeholder="repeat your password" onChange={(e) => { rellenarDatos(e) }}/>
            <Button 
            color="red"
            children="Registrate"
            onClick={() => registrame()}
            />
            <p> {msgError} </p>
        </div>
    )
}
export default Register;