import axios from 'axios';
import React, { useState,useRef } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import Loading from '../core/Loading';

const GenerateImage = () => {

  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('');
  const searchTextRef = useRef(null);
  const callGenerateApi = (e) =>{
    e.preventDefault();
    setLoading(true);
    axios.post('http://localhost:9000/api/aiApi/generate', {description: searchText})
        .then(response => {
          setGeneratedImage(response.data.photo);
        })
        .catch(error => {
            console.error('There was an error!', error);
        })
        .finally(()=>{
          searchTextRef.current.value = '';
          setSearchText('');
          setLoading(false)
        })
  }

  const ImageCard = () =>{
    return(
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={`data:image/jpg;base64,${generatedImage}`} alt="Image here"/>
      </Card>
    )
  }

  return (
    <div>
      <Form onSubmit={callGenerateApi}>
        <Form.Group className="mb-3">
          <Form.Label>Eneter the image text you need</Form.Label>
          <Form.Control type="text" 
            onChange={(e)=> setSearchText(e.target.value)} 
            ref={searchTextRef}
            disabled={loading}/>
        </Form.Group>
        <Button variant="warning" type="submit" disabled={!searchText || loading}>
          Click to Generate
        </Button>
      </Form>
      <div className="image-container">
        {loading ? <Loading /> : 
          generatedImage ? <ImageCard /> : <ImageCard />
        }
      </div>
    </div>
  )
}

export default GenerateImage