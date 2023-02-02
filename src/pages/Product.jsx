import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MedusaContext } from '../context/MedusaContext'
import { Button, Row, Col, Container } from 'react-bootstrap'

const Product = () => {
    const { id } = useParams()

    const medusaContext = useContext(MedusaContext)

    const [product, setProduct] = useState([])

    useEffect(() => {
        medusaContext.getOneProduct(id)
            .then(res => setProduct(res))
    },[])
  return (
    product && 
    <Container className='mt-4'>
        <Row>
            <Col>
                <img src={product.thumbnail} style={{maxWidth: '400px'}} />
            </Col>

            <Col className='py-5 d-flex flex-column justify-content-around align-items-center'>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <h5>€ {(product.variants?.[0]?.prices?.[0]?.amount / 100).toFixed(2)}</h5>
                <Button variant='success' onClick={() => medusaContext.createACart(product.variants?.[0]?.id)}>Add to Cart</Button>
            </Col>
        </Row>
    </Container>
  )
}

export default Product