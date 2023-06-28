import React from 'react'
import './HomePage.scss'
import Slider from '../../components/Slider/Slider'

const HomePage = () => {
  return (
    <div className='homepage' style={{}}>
      <Slider/>
      <div style={{backgroundColor:"red", height:"100vh"}}></div>
    </div>
  )
}

export default HomePage
