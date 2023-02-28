import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import './home.css'
import axios from 'axios';
import {
    Button,
    Card,
    Group,
    Input,
    Text,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';

const Home = (props) => {

    const navigate = useNavigate();

    const [products, setProducts] = useState([])
    const [msgError, setMsgError] = useState(null)
    const [productsData, setProductsData] = useState({
        name: "",
        observations: ""
    })
    const [subproducts, setSubProducts] = useState([])

    const [condicion,setCondicion] = useState()

    useEffect(() => {
        if (!props.credentials.token) {
            navigate('/login')
        }
        bringProducts();
    }, []);

    useEffect(() => {

    }, [condicion])

    const rellenarDatos = (e) => {
        setProductsData({ ...productsData, [e.target.name]: e.target.value })
    };

    const bringProducts = async () => {

        try {
            let result = await axios.get('https://ecig-jppl.herokuapp.com/products')

            if (result) {
                setProducts(result.data)
            } else {
                setMsgError("hubo un error al traer los productos")
            }
        } catch (error) {
            setMsgError(error)
        }
    }

    const bringSubProducts = async (id) => {

        let config = {
            headers: { Authorization: `Bearer ${props.credentials.token}` }
        };
        try {
            let result = await axios.get(`https://ecig-jppl.herokuapp.com/productsAquired/${id}`, config)

            if (result) {
                setSubProducts(result.data)
            } else {
                setMsgError("hubo un error al traer los subproductos")
            }
        } catch (error) {
            setMsgError(error)
        }
    }

    const deleteProduct = async (id) => {

        try {
            let config = {
                headers: { Authorization: `Bearer ${props.credentials.token}` }
            };

            let res = await axios.delete(`https://ecig-jppl.herokuapp.com/products/delete/${id}`, config)

            if (res) {
                showNotification({
                    color: 'green',
                    transition: 'fade',
                    message: 'Producto eliminado con exito',
                    autoClose: 5000,
                })
            }
            await bringProducts()
        } catch (error) {
            setMsgError("error al eliminar el producto");
        }


    }

    const updateProduct = async (id) => {
        try {

            const body = {
                name: productsData.name,
                observations: productsData.observations
            }

            let resultado = await axios.put(`https://ecig-jppl.herokuapp.com/products/update/${id}`, body);

            if (resultado) {
                showNotification({
                    color: 'green',
                    transition: 'fade',
                    message: 'Se ha cambiado los datos del producto',
                    autoClose: 5000,
                })
                await bringProducts()
            } else {
                setMsgError("no se se pudo cambiar")
            }

        } catch (error) {
            setMsgError(error)
        }
    }

    const deleteSubProduct = async (id) => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${props.credentials.token}` }
            };

            let res = await axios.delete(`https://ecig-jppl.herokuapp.com/productsAquired/${id}`, config)

            if (res) {
                showNotification({
                    color: 'green',
                    transition: 'fade',
                    message: 'Se ha eliminado el subproducto con exito',
                    autoClose: 5000,
                })

            }
            await bringSubProducts(id)
        } catch (error) {
            setMsgError("error");
        }

    }

    const updateSubProduct = async (id) => {
        try {

            const body = {
                name: productsData.name,
                observations: productsData.observations
            }

            let resultado =  axios.put(`https://ecig-jppl.herokuapp.com/productsAquired/${id}`, body);

            if (resultado) {
                showNotification({
                    color: 'green',
                    transition: 'fade',
                    message: 'Se ha cambiado los datos del subproducto con exito',
                    autoClose: 5000,
                })
                await bringSubProducts(id)
            } else {
                setMsgError("no se ha cambiado")
            }

        } catch (error) {
            setMsgError(error)
        }
    }

    return (
        <div className='home'>
            <div className='izquierdo'>
                <div className='titulo'>
                    <h1>Lista de productos</h1> 
                </div>
                <div className='productos jugando'>
                    {
                        products.map(datica => {
                            return (
                                <div className="cartas" key={datica.id}>
                                    <Card style={{ width: '18rem' }}>
                                        <Group position="apart" mt="md" mb="xs">
                                            <Text weight={500}>Nombre del producto:<b>{datica.name}</b></Text>
                                        </Group>
                                        <Group position="apart" mt="md" mb="xs">
                                            <Text weight={500}>Observations:<b>{datica.observations}</b></Text>
                                        </Group>
                                        
                                        <Button style={{margin : "1em"}} variant="success" onClick={() => bringSubProducts(datica.id)}>more like this</Button>
                                        <Button style={{margin : "1em"}} color="red" onClick={() => deleteProduct(datica.id)}>delete this product</Button>
                                        <Input type="text" name="name" id="name" placeholder="name" onChange={(e) => { rellenarDatos(e) }} /> <br />
                                        <Input type="text" name="observations" id="observations" placeholder="observations" onChange={(e) => { rellenarDatos(e) }} /> <br />
                                        <Button 
                                        children="Update product"
                                        color="green" 
                                        onClick={() => updateProduct(datica.id)}
                                        />
                                    </Card><br />
                                    <div>
                                        {msgError}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='derecho'>
                <div className='tituloSub'>
                    <h1>Lista de subproductos</h1>
                </div>
                <div className='subproductos jugando'>
                    {
                        subproducts.map(datica => {

                            return (
                                <div className="cartas" key={datica.id}>
                                    <Card style={{ width: '18rem' }}>
                                        <Group position="apart" mt="md" mb="xs">
                                            <Text weight={500}>Nombre del subproducto:<b>{datica.name}</b></Text>
                                        </Group>
                                        <Group position="apart" mt="md" mb="xs">
                                            <Text weight={500}>Observations:<b>{datica.observations}</b></Text>
                                        </Group>
                                        
                                        <Button style={{margin : "1em"}} color="red" onClick={() => deleteSubProduct(datica.id)}>delete this product</Button>
                                        <Input type="text" name="name" id="name" placeholder="name" onChange={(e) => { rellenarDatos(e) }} /> <br />
                                        <Input type="text" name="observations" id="observations" placeholder="observations" onChange={(e) => { rellenarDatos(e) }} /> <br />
                                        <Button 
                                        children="Update product"
                                        color="green" 
                                        onClick={() => updateSubProduct(datica.id)}
                                        />
                                    </Card><br />
                                    <div>
                                        {msgError}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default connect((state) => ({
    credentials: state.credentials
}))(Home);