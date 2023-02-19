import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css'
import { Button, Input, List } from '@mantine/core'
import { showNotification } from '@mantine/notifications';
import Accordion from 'react-bootstrap/Accordion';




const Admin = () => {

    const navigate = useNavigate();

    const [newProduct, setNewProduct] = useState({
        name: "",
        observations: ""
    });
    const [products, setProducts] = useState([])
    const [actualProducts,setActualProducts] = useState([])

    const [newSubProduct, setNewSubProduct] = useState({
        name: "",
        observations: "",
        productId: ""
    });

    const [msgError, setMsgError] = useState("");

    useEffect(() => {
        bringProducts()
    }, [])

    useEffect(() => {

    }, [actualProducts])

    const rellenarDatos = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        })
    };
    const rellenarDatos2 = (e) => {
        setNewSubProduct({
            ...newSubProduct,
            [e.target.name]: e.target.value
        })
    };

    const createProduct = () => {

        try {

            const body = {
                name: newProduct.name,
                observations: newProduct.observations
            }

            const results = axios.post('http://localhost:5000/products/crear', body)
            setActualProducts(true)

            if (results) {
                showNotification({
                    color: 'green',
                    transition: 'fade',
                    message: 'Producto creado con exito',
                    autoClose: 5000,
                })
            } else {
                setMsgError("no se creo nada")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const createSubProduct = () => {

        try {

            const body = {
                name: newSubProduct.name,
                observations: newSubProduct.observations,
            }

            const productId = newSubProduct.productId

            const results = axios.post(`http://localhost:5000/productsAquired/aquire/${productId}`, body)

            if (results) {
                showNotification({
                    color: 'green',
                    transition: 'fade',
                    message: 'Subproducto creado con exito',
                    autoClose: 5000,
                })
            } else {
                showNotification({
                    color: 'red',
                    transition: 'fade',
                    message: 'Error al crear el subproducto',
                    autoClose: 5000,
                })
            }
        } catch (error) {
            setMsgError(error)
        }
    }

    const bringProducts = async () => {
        try {

            const bring = await axios.get('http://localhost:5000/products')

            if (bring) setProducts(bring.data)
            else setMsgError("no se pudo traer ningun producto")

        } catch (error) {
            setMsgError(error)
        }
    }

    return (
        <div className='admin'>
            <div className='izquierdoadmin'>

                <div className='superioradmin'>
                    <Input style={{ padding: '.5em' }} name="name" placeholder="name" onChange={(e) => { rellenarDatos(e) }} />
                    <Input style={{ padding: '.5em' }} name="observations" placeholder="observations" onChange={(e) => { rellenarDatos(e) }} />
                    <Button
                        children="Crear producto"
                        color="red"
                        onClick={() => createProduct()}
                    />
                    <p> {msgError} </p>
                </div>

                <div className='inferioradmin'>
                    <Input style={{ padding: '.5em' }} name="name" placeholder="name" onChange={(e) => { rellenarDatos2(e) }} />
                    <Input style={{ padding: '.5em' }} name="observations" placeholder="observations" onChange={(e) => { rellenarDatos2(e) }} />
                    <Input style={{ padding: '.5em' }} name="productId" placeholder="ID del producto" onChange={(e) => { rellenarDatos2(e) }} />
                    <Button
                        children="Crear subproducto"
                        color="red"
                        onClick={() => createSubProduct()}
                    />

                    <br />
                    <p> {msgError} </p>
                </div>
            </div>
            <div className='derechoadmin'>

                {
                    products.map(productos => {
                        return (
                            <div className='listaProductos'>
                                <List>
                                    <List.Item>Nombre del producto: {productos.name}</List.Item>
                                    <List.Item>Id del producto:{productos.id}</List.Item>
                                </List>
                            <br></br></div>
                        )
                    })
                }


            </div>
        </div>
    )
}
export default Admin;