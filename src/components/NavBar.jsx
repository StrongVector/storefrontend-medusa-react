import React, { useContext, useState, useEffect } from 'react'
import { Button, Navbar, Modal, Table, Container } from 'react-bootstrap';
import { MedusaContext } from '../context/MedusaContext'
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [show, setShow] = useState(false)
    const [items, setItems] = useState([])
    const [cart, setCart] = useState()

    const medusaContext = useContext(MedusaContext)

    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        medusaContext.getCartCount()
            .then(res => setCartCount(res))

    }, [medusaContext])

    // functions to handle modal closing and opening
    const handleShow = () => {
        const CartId = localStorage.getItem('CartId')
        setShow(true)
        if(CartId){
            medusaContext.getACart()
            .then(({ cart }) => {
                setItems(cart.items)
                setCart(cart)
                console.log(cart.items)
            })
        }
    }
    const handleClose = () => setShow(false)

  return (
    <>
        <Navbar expand="sm">
        <Navbar.Brand href='/'>MyStore</Navbar.Brand>
        <Navbar.Toggle />

        {/* The items to collapse */}
        <Navbar.Collapse className='justify-content-end'>
          <Button variant='success' onClick={handleShow}>Cart ({cartCount} Items)</Button>
        </Navbar.Collapse>
      </Navbar>

      {/* Cart Modal */}
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>My Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
                items.length>0 ?

                <Container  className="d-flex flex-column" style={{ width: "100%", justifyContent: "center" }}>

                <Table>
            <thead>
                <tr>
                <th>#</th>
                <th>Thumbnail</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map((item, id) => (
                        <tr key={id}>
                            <td>{id + 1}</td>
                            <td><img src={item.thumbnail} alt={item.title} style={{maxWidth: '100px'}} /></td>
                            <td>{item.title}</td>
                            <td>{item.quantity}</td>
                            <td>€ {(item.unit_price / 100).toFixed(2)}</td>
                            <td>€ {(item.total / 100).toFixed(2)}</td>
                        </tr>
                    ))
                }
                <tr>
                    <td colSpan='5' className="text-end">Sub total:</td>
                    <td>€ {(cart?.subtotal / 100).toFixed(2)}</td>
                </tr>
                <tr>
                    <td colSpan='5' className="text-end">Tax:</td>
                    <td>€ {(cart?.tax_total / 100).toFixed(2)}</td>
                </tr>
                <tr>
                    <td colSpan='5' className="text-end">Total:</td>
                    <td>€ {(cart?.total / 100).toFixed(2)}</td>
                </tr>
            </tbody>
            </Table> 
            <Link to='/checkout' className='d-flex'>
                <Button variant='success' className='mt-4 mx-auto' onClick={handleClose}>Checkout</Button>
            </Link>
            
            </Container> :

            <p>no items</p>
            }
        </Modal.Body>
      </Modal>
    </>
  )
}

export default NavBar