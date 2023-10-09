import React from 'react';
import {Routes, Route} from "react-router-dom";
import Login from "../src/Pages/Login/Login"
import HomePage from './Pages/HomePage/HomePage';
import SignUp from './Pages/SignUp/SignUp';
import Dashboard from './Pages/Dashboard/Dashboard';
import SellItem from './Pages/SellItem/SellItem';
import CartDisplay from './Pages/CartDisplay/CartDisplay';
import Message from './Components/Message/Message';
import Modal from './Components/Modal/Modal';
import Search from './Pages/Search/Search';
import About from './Pages/About/About';





const App = () => {
  return (
    <Routes>
      
        <Route exact path='/' element={<HomePage/>}/>
        <Route  path='/login' element={<Login/>}/>
        <Route  path='/signup' element={<SignUp/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/sell' element={<SellItem/>}/>
      
        <Route path='/message/:email' element={<Message/>}/>
        <Route path='/cartitems' element={<CartDisplay/>}/>
        <Route path='/modal' element={<Modal/>}/>
        <Route path='/search/:search' element={<Search/>}/>
        <Route path='/about' element={<About/>}/>
        
        
        
       
    </Routes>
  )
}

export default App