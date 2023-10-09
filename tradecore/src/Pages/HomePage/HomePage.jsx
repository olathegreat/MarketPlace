import React from 'react'
import Nav from '../../Components/Nav/Nav'
import Footer from '../../Components/Footer/Footer'
import Hero from '../../Components/Hero/Hero'


import SalesItems from '../../Components/SalesItems/SalesItems'

const HomePage = () => {
  return (
    <div>
        <Nav/>
        <Hero/>
        <SalesItems/>
        

        <hr></hr>
        

        <Footer/>
    </div>
  )
}

export default HomePage;