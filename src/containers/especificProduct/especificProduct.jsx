
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Accordion } from '@mantine/core';

import './especificProduct.css';

const EspecificProduct = (props) => {

    let navigate = useNavigate();

    useEffect(() => {

        if (props.search?.nombre === undefined) {
            navigate('/');
        }
    });

    return (
        <div className='especificProduct'>

            <Card style={{
                width: '18rem',
                margin: '1.35em'
            }} >
                <Card.Img variant="top" src={props.search.imagen} />
                <Card.Body>
                    <Card.Title>{props.search.nombre}</Card.Title>
                    <Card.Text>
                        <Accordion>
                            <Accordion.Item label="Ingredientes" >
                                {
                                    props.credentials.token && "Ingredientes:" && props.search.ingredientes
                                }
                            </Accordion.Item>
                        </Accordion>
                        <Accordion>
                            <Accordion.Item label="Preparacion" >
                                {
                                    props.credentials.token && props.search.preparacion
                                }
                                {
                                    props.credentials.token && props.search.preparacion_2
                                }
                            </Accordion.Item>
                        </Accordion>
                    </Card.Text>
                </Card.Body>
                <Card.Body>
                    {
                        props.credentials.token && <Adquirir id={props.search.id} token={props.credentials.token} idUser={props.credentials.usuario.id} />
                    }
                </Card.Body>
            </Card>
        </div>
    )

}

export default connect((state) => ({
    credentials: state.credentials,
    search: state.search
}))(EspecificProduct);
