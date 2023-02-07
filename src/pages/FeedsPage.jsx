import React from 'react'
import { Button, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const FeedsPage = () => {
  return (
    <>
      <Row className='m-3'>
        <Link to="/generateImage"><Button>Generate</Button></Link>
      </Row>
    </>
  )
}

export default FeedsPage