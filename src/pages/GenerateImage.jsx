import axios from 'axios';
import React, { useState,useRef, useMemo } from 'react'
import Loading from '../core/Loading';
import '../styles/GenerateImage.scss';
import PostToFeedsForm from '../core/PostToFeedsForm';
import DummyImage from '../core/DummyImage';

const GenerateImage = () => {
  const [searchText, setSearchText] = useState('');
  const [count, setCount] = useState(1)
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState([]);
  const [formPost, setFormPost] = useState({
    userName: '',
    description: '',
    imageCount: ''
  })
  const searchTextRef = useRef(null);



  const callGenerateApi = (e) =>{
    e.preventDefault();
    setLoading(true);
    axios.post('http://localhost:9000/api/aiApi/generate', {description: searchText, count: count})
        .then(response => {
          let image = response.data;
          setGeneratedImage(image.photo);
        })
        .catch(error => {
          setLoading(false)
          console.error('There was an error!', error.message);
        })
        .finally(()=>{
          searchTextRef.current.value = '';
          setSearchText('');
          setLoading(false)
        })
  }

  const ImageConatiner = () =>{
    return(
      <div className='d-flex gap-4 flex-wrap justify-content-center'>
        {generatedImage.map((image,i) => {
          return(
            <div className='dummy_img' key={i}>
              <img src={`data:image/png;base64,${image.b64_json}`} alt="Generated" />
            </div>
          )
        })}
      </div>
    )
  }


  return (
    <div>
      {loading === true && <Loading />}
      <form onSubmit={callGenerateApi} className="searchForm gap-3">
        <input 
          type="text" 
          placeholder="Enter the description you need" 
          onChange={(e)=> setSearchText(e.target.value)}
          ref={searchTextRef}
          className="col-6"
          disabled={loading}
        />
        <select  onChange={(e)=> setCount(e.target.value)} className="col-2" disabled={loading}>
          <option>1</option>
          <option>2</option>
        </select>
        <input type="submit" className='col-2' disabled={!searchText}/>
      </form>
      <div className='d-flex justify-content-center'>
        {generatedImage && generatedImage.length > 0 ? <ImageConatiner /> : <DummyImage count={count} />}
      </div>
      <div className="postToFeedsForm">
        {(generatedImage && generatedImage.length > 0) && 
          <PostToFeedsForm  
            formPost={formPost} 
            setFormPost={setFormPost} 
            generatedImage={generatedImage}
            setLoading ={setLoading}
          /> }
        {/* <PostToFeedsForm formPost={formPost} setFormPost={setFormPost} generatedImage={generatedImage}/> */}
      </div>
    </div>
  )
}

export default GenerateImage

