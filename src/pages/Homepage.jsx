import React, { useContext, useState, useEffect } from 'react'
import { MedusaContext } from '../context/MedusaContext'
import { Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

const Homepage = () => {
    const medusaContext = useContext(MedusaContext)

    const [products, setProducts] = useState([])

    useEffect(() => {
        medusaContext.getAllProducts()
            .then(res => setProducts(res))
    },[])
  return (
    <>
        <Row xs={1} md={3} className='g-4 my-3'>
            {
                products && products.map((product, id) => (
                    <Col key={id} align='center'>
                        <ProductCard product={product} />
                    </Col>
                ))
            }
        </Row>
    </>
  )
}

export default Homepage