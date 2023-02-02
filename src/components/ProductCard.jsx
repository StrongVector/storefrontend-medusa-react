import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <Card>
        <Card.Img variant='top' src={product.thumbnail} alt={product.title} />
        <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text className='mt-4'>€ {(product.variants?.[0]?.prices?.[0]?.amount / 100).toFixed(2)}</Card.Text>
            {/* <Button variant='primary'>View Details</Button> */}
            <Link to={`/product/${product.id}`}>View Details</Link>
        </Card.Body>
    </Card>
  )
}

export default ProductCard