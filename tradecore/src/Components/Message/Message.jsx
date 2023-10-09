import React from 'react'
import { Link, useParams } from 'react-router-dom';
import Chatra from './Chatra'
import "./Message.css";
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import { useEffect } from 'react';

function Message() {
    const { email } = useParams();
    useEffect(() => {
      alert(email);
    
      
    }, [])
    
    return (
      <div className='message-page' style={{width:"100vw", height:"100vh", display:"flex", justifyContent:"space-between", flexDirection:"column", paddingTop:"50px"}}>
       <h1 style={{textAlign:"start"}}><Link to="/">TradeCore</Link></h1>
        <div className='main-message-content' style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", color:"grey"}}>
            <p style={{fontSize:"1.5em"}}>Click On the Chat button on the bottom left corner to chat with the seller</p>

            <p>You can also send a direct email to the seller at <a href={`mailto:${email}`}>{email}</a></p>
        </div>
        
        {/* your product page content here */}
        <div className='chatra'>

           <Chatra sellerEmail={email} />


        </div>

        <Footer/>
       
      </div>
    );
  }

export default Message