import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loading from '../core/Loading'
import '../styles/FeedsPage.scss'
import FileSaver from 'file-saver';
import { GrDownload } from 'react-icons/gr';
import {MdDraw} from 'react-icons/md'
import {FiFilter} from 'react-icons/fi'
import {BsSearch} from 'react-icons/bs'
const FeedsPage = () => {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [filteredArray, setFilteredArray] = useState([])
  const [filterParameter, setFilterParameter] = useState('description')
  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:9000/api/postApi/getPosts')
    .then(response => {
      setData(response.data.data)
      setFilteredArray(response.data.data)
    })
    .catch(error => {
      setLoading(false)
      console.error('There was an error!', error.message);
    })
    .finally(()=>{
      setLoading(false)
    })
  },[])

  const downloadImage = async(id,photo) =>{
    await FileSaver.saveAs(photo, `download${id}`)
  }

  const handleChange = (e) =>{
    setFilterParameter(e.target.value)
  }

  const handleSearch = (e) =>{
    let {value} = e.target
    if(value){
      let dataArray = filteredArray.filter((item) => 
      item[filterParameter].toLowerCase().includes(e.target.value.toLowerCase()))
      setFilteredArray(dataArray)
    }else{
      setFilteredArray(data)
    }
  }

  const calculateDayDifference = (postDate) =>{
    let date1 = new Date(postDate);
    let date2 = new Date(); 
    let Difference_In_Time = date2.getTime() - date1.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    if(Difference_In_Days <= 1){
      return 'Today'
    }else{
      return parseInt(Difference_In_Days) + ' days ago';
    }
  }
  
  return (
    <>
    {loading === true && <Loading />}
      <div className='m-3'>
        <div className="top-container d-flex flex-wrap gap-1">
          <p className='text-muted'>Click here to generate a 1024 X 1024 sized image based on your description</p>
          <Link to="/generateImage" class= "d-flex align-items-center">
            <Button>Generate <MdDraw /></Button>            
          </Link>
        </div>
        <div className="search-container d-flex flex-wrap my-3 gap-2 align-items-center">
          <FiFilter class="fs-4 text-muted"/>
          <select className="dropdown col-md-2 col-10" value={filterParameter} onChange={handleChange}>
            <option value="name">Name</option>
            <option value="description">Tag</option>
          </select>
          <div className="group col-md-6 col-12">
            <BsSearch className="icon"/>
            <input placeholder="Search" type="search" className="input" onChange={handleSearch}/>
          </div>
        </div>
        <div className='d-flex flex-wrap mt-3 gap-3 justify-content-center'>
        {filteredArray.length > 0 ? filteredArray.map((img,i)=>
            <div className="card" key={i}>
              <div className="img">
                <img src={img.photo}  alt="d" key={i} style={{width: '250px'}}/>
                <div className="save" onClick={() => downloadImage(i, img.photo)}><GrDownload /></div>
              </div>
            <div className="text">
              <p className="h3">{img.description}</p>
              {/* <p className="p"> Generated at {img.updated_at.substring(0,10)} </p> */}
              <p className="p"> Posted {calculateDayDifference(img.updated_at)}</p>
              <p className="p"> - {img.name} </p>
            </div>
          </div>
        ) : 'Empty'}
        </div>
      </div>
    </>
  )
}

export default FeedsPage