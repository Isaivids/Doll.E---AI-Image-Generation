import React from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'

const MenuBar = () => {
  return (
    <Navbar expand="md" className='container-fluid shadow-sm'>
        <Container className='d-flex justify-content-lg-between justify-content-center'>
        <Navbar.Brand className='text-white fw-bold'>IsaiVids - OpenAI</Navbar.Brand>
        <Button variant="secondary">Developer Contact</Button>
        </Container>
    </Navbar>
  )
}

export default MenuBar