import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkError } from '../../tools';
import './register.css';

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
               console.log("te has registrado con exito")
            }

            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (error) {
            console.log(error);
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
            <input  style={{ padding: '.5em' }} name="name" placeholder="name" onChange={(e) => { rellenarDatos(e) }}/>
            <input  style={{ padding: '.5em' }} name="lastName" placeholder="lastName" onChange={(e) => { rellenarDatos(e) }}/>
            <input  style={{ padding: '.5em' }} name="email" placeholder="email" onChange={(e) => { rellenarDatos(e) }}/>
            <input  style={{ padding: '.5em' }} name="password" placeholder="password" onChange={(e) => { rellenarDatos(e) }}/>
            <input  style={{ padding: '.5em' }} name="password2" placeholder="password2" onChange={(e) => { rellenarDatos(e) }}/>
            <div className='boton' onClick={() => registrame()}>
                registrame
            </div> <br />
            <p> {msgError} </p>
        </div>
    )
}
export default Register;