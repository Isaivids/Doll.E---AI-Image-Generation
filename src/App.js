import React from 'react'
import { Route, Routes} from 'react-router-dom'
import './App.scss'
import MenuBar from './core/MenuBar'
import FeedsPage from './pages/FeedsPage'
import GenerateImage from './pages/GenerateImage'

const App = () => {

  return (
    <>
      <MenuBar />
      <Routes>
        <Route exact path="/" element={<FeedsPage />} />
        <Route exact path="/generateImage" element={<GenerateImage />} />
      </Routes>
    </>
  )
}

export default App