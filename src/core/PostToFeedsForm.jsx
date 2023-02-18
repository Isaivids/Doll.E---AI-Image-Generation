import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const PostToFeedsForm = ({formPost, setFormPost, generatedImage, setLoading}) => {
const navigate = useNavigate();

const handleChange = (event) => {
    setFormPost({
        ...formPost,
        [event.target.name]: event.target.value,
    });
};

const handleSubmit = (e) =>{
    e.preventDefault()
    setLoading(true);
    axios.post('http://localhost:9000/api/postApi/createPost', {
        name: formPost.userName,
        description: formPost.description,
        photo: formPost.image.b64_json,
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      setLoading(false)
      console.error('There was an error!', error.message);
    })
    .finally(()=>{
      setLoading(false)
      navigate("/");
    })
}


  return (
    <div>
        <form onSubmit={handleSubmit} className="d-flex m-3 gap-2 flex-wrap justify-content-center">
          <input 
            type="text" 
            placeholder='Enter your Name' 
            className='col-md-2 col-12' 
            onChange={handleChange}
            name="userName"/>
          <input 
            type="text" 
            placeholder='Enter Description' 
            className='col-md-4 col-12' 
            onChange={handleChange}
            name="description"/>
          <div className="radio col-md-2 col-12 d-flex justify-content-center" 
            onChange={(e) => setFormPost({...formPost, image: generatedImage[e.target.value]})}>
                <input type="radio" id="Image1" name="imageCount" value={0}/>
                <label htmlFor="Image1">Image 1</label>
                <input type="radio" id="Image2" name="imageCount" value={1} />
                <label htmlFor="Image2">Image 2</label>
          </div>
          <button className='col-md-2 col-6'>Post To feeds</button>
        </form>
    </div>
  )
}

export default PostToFeedsForm