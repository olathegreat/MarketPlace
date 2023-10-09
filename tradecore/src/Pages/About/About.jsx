import React from 'react'
import Nav from '../../Components/Nav/Nav'
import Footer from '../../Components/Footer/Footer'
import "./About.css";

const About = () => {
  return (
    <div className='about-page'>
        <Nav/>

        <main className='about-page-wrapper'>

            <div className='left'>
                <img src='img/market.png' alt='marketPlace'/>

            </div>

            <div className='right'>

                <h1>Welcome to TradeCore!</h1>

                

                <p>
                Our mission is to provide a platform that connects students and 
                staff members of universities to buy and sell items with ease. We
                 aim to create a community-driven marketplace where individuals 
                can not only make extra income but also reduce waste by reusing items.
                </p>

                <p>
                At TradeCore, we are committed to providing a seamless
                 and secure user experience. Our platform offers a user-friendly
                  interface, advanced search and filtering options, and secure
                   payment processing to
                 ensure a safe transaction for both buyers and sellers.
                </p>

                <p>
                We are a team of dedicated individuals who are passionate
                 about creating an innovative solution to address the
                  financial challenges faced by students and staff members.
                   Our team comprises experts in software development,
                 user experience, and business strategy
                </p>

                <p>
                We welcome your feedback and suggestions as we strive to continuously
                 improve the TradeCore platform to meet the needs of our users.
                  Join us in
                 our mission to create a sustainable and thriving marketplace community!
                </p>

            </div>

        </main>

        <Footer/>
        
    </div>
  )
}

export default About