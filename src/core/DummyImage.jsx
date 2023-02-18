import React from 'react'
import dummy_img from '../assets/dummy_img.png';

const DummyImage = ({count}) => {
  return (
    <div className='d-flex gap-4 flex-wrap justify-content-center'>
    {Array.from( {length:count}, (v,i) => {
      return(
        <div className='dummy_img' key={i}>
          <img src={dummy_img} alt="Placeholder" />
        </div>
      )
    } )}
  </div>
  )
}

export default DummyImage