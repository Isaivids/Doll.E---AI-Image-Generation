import React from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
import {CgInfo} from 'react-icons/cg'
import {FiShare2} from 'react-icons/fi'
const MenuBar = () => {
  return (
    <Navbar expand="md" className='container-fluid shadow-sm'>
        <Container className='d-flex justify-content-lg-between justify-content-center'>
        <Navbar.Brand className='text-white fw-bold'>IsaiVids - OpenAI</Navbar.Brand>
        <div className="iocn-dic d-flex gap-2">
          <Button variant="secondary"><CgInfo/></Button>
          <Button variant="success"><FiShare2 /></Button>
        </div>
        </Container>
    </Navbar>
  )
}

export default MenuBar