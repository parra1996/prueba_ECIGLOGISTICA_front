import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
    const [subproducts, setSubProducts] = useState([])
    const [condition, setcondition] = useState(false)

    useEffect(() => {
        if (!props.credentials.token) {
            navigate('/login')
        }

        bringProducts();

    }, []);

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

            
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className='home'>
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
                                
                                
                                {/* <Group>
                                    <Accordion defaultActiveKey="0" >
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Body className='acordeon' >
                                                {
                                                    subproducts.map(results => {
                                                        return (
                                                            <div className="pedidos2" key={results.id}>
                                                                <p>
                                                                    Nombre: {results.name}.
                                                                </p>
                                                                <p>
                                                                    observations: {results.observations}.
                                                                </p>
                                                                <Button variant="danger" onClick={() => borrar_pedido(results.id)}>borrar receta</Button>
                                                                <br /><br />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Group> */}
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