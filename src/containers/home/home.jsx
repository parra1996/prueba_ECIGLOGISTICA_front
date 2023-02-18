import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useFetcher, useNavigate } from 'react-router-dom';
import './home.css'
import axios from 'axios';
import {
    Button,
    Card,
    Group,
    Text,
} from '@mantine/core';
import Accordion from 'react-bootstrap/Accordion'



const Home = (props) => {

    const navigate = useNavigate();

    const [products, setProducts] = useState([])
    const [productsData, setProductsData] = useState({
        name : "",
        observations : ""
    })
    const [subproducts, setSubProducts] = useState([])
    const [condition, setcondition] = useState(false)

    useEffect(() => {
        if (!props.credentials.token) {
            navigate('/login')
        }

        bringProducts();

    }, []);

    useEffect(()=>{
        
    },[productsData])

    const rellenarDatos = (e) => {
        setProductsData({ ...productsData, [e.target.name]: e.target.value })
    };

    const bringProducts = async () => {

        try {
            let result = await axios.get('http://localhost:5000/products')

            if (result) {
                setProducts(result.data)
            } else {
                console.log("hubo un error al traer los productos")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const bringSubProducts = async (id) => {

        try {
            let result = await axios.get(`http://localhost:5000/productsAquired/${id}`)

            console.log(result.data)

            if (result) {
                setcondition(true)
                setSubProducts(result.data)
            } else {
                console.log("hubo un error al traer los subproductos")
            }
        } catch (error) {
            console.log(error)
        }
    }

    
    const deleteProduct = async (id) => {

        try {
            let config = {
                headers: { Authorization: `Bearer ${props.credentials.token}` }
            };

            let res = axios.delete(`http://localhost:5000/products/delete/${id}`, config)
            if (res) {
            console.log("producto eliminado con exito")

                setTimeout(() => {
                    window.location.reload();

                }, 2000);
            }
        } catch (error) {
            console.log("error");
        }


    }

    const updateProduct = async (id) => {
        try {

            const body = {
                name : productsData.name,
                observations : productsData.observations
            }

            let resultado = await axios.put(`http://localhost:5000/products/update/${id}`, body);

            if(resultado){
                console.log("se ha cambiado con exito")
            }else {
                console.log("no se ha cambiado")
            }

        }catch(error){
            console.log(error)
        }
    }

    const deleteSubProduct = (id) => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${props.credentials.token}` }
            };

            let res = axios.delete(`http://localhost:5000/productsAquired/${id}`, config)
            if (res) {
            console.log("subproducto eliminado con exito")

                setTimeout(() => {
                    window.location.reload();

                }, 2000);
            }
        } catch (error) {
            console.log("error");
        }

    }

    const updateSubProduct = async (id) => {
        try {

            const body = {
                name : productsData.name,
                observations : productsData.observations
            }

            let resultado = await axios.put(`http://localhost:5000/productsAquired/${id}`, body);

            if(resultado){
                console.log("se ha cambiado con exito")
            }else {
                console.log("no se ha cambiado")
            }

        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className='home'> 
        <div className='homecitos'>
        {
                products.map(datica => {
                    return (
                        <div className="cartas" key={datica.id}>
                            <Card style={{ width: '18rem' }}>
                                <Group position="apart" mt="md" mb="xs">
                                    <Text weight={500}>{datica.name}</Text>
                                </Group>
                                <Text size="sm" color="dimmed">
                                    {datica.observations}
                                </Text>
                                <Button variant="success" onClick={() => bringSubProducts(datica.id)}>more like this</Button>
                                <Button color="red" onClick={() => deleteProduct(datica.id)}>delete this product</Button>
                                <Button color="green" onClick={() => updateProduct(datica.id)}>update this product</Button>
                                <input type="text" name="name" id="name" placeholder="name" onChange={(e) => { rellenarDatos(e) }} /> <br />
                                <input type="text" name="observations" id="observations" placeholder="observations" onChange={(e) => { rellenarDatos(e) }} /> <br />
                            </Card><br />
                        </div>
                    )
                })
        }
        </div> 
        <div className='homecitos'>
            
        </div> 
        {
                subproducts.map(datica => {
                    return (
                        <div className="cartas" key={datica.id}>
                            <Card style={{ width: '18rem' }}>
                                <Group position="apart" mt="md" mb="xs">
                                    <Text weight={500}>{datica.name}</Text>
                                </Group>
                                <Text size="sm" color="dimmed">
                                    {datica.observations}
                                </Text>
                                <Button color="red" onClick={() => deleteSubProduct(datica.id)}>delete this product</Button>
                                <Button color="green" onClick={() => updateSubProduct(datica.id)}>update this product</Button>
                                <input type="text" name="name" id="name" placeholder="name" onChange={(e) => { rellenarDatos(e) }} /> <br />
                                <input type="text" name="observations" id="observations" placeholder="observations" onChange={(e) => { rellenarDatos(e) }} /> <br />
                            </Card><br />
                        </div>
                    )
                })
        }
        </div>
    )
}
export default connect((state) => ({
    credentials: state.credentials
}))(Home);