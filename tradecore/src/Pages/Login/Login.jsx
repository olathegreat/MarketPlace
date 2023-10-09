import React, {useState} from "react";
import Nav from "../../Components/Nav/Nav";
import "./Login.css";
import { FaLock, FaEnvelope, FaEyeSlash } from "react-icons/fa";

import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from "../../packaages/firebase";
import { decrement, increment, userEmailFunction } from '../../packaages/slice'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'


const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(increment());

        dispatch(userEmailFunction(email));
        
        navigate("/dashboard")
        console.log(user);

    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setEmailError(errorMessage);
    });
   
}
  return (
    <div className="Login">
      <Nav />

      <main className="login-main">
        <div className="login-content-wrapper">
          <div className="login-content-img">
            <img src="img/tradecore.png" alt="tradecore logo" />
          </div>

          <h1>Welcome to TradeCore</h1>

          <p className="login-description">
            If you're a registered user, please enter your email address and
            password to access your account. If you're new to the marketplace,
            you can create an account by clicking on the "link" button below
          </p>

          <form>
            <div className="input-container">
              <FaEnvelope color="#c5c5c5" />

              <input
              
                placeholder="Type your university mail"
                id="email-address"
                name="email"
                type="email"    
                onChange={(e)=>setEmail(e.target.value)}                                
                required 
              />
            </div>
          

            <div className="input-container">
              <FaLock color="#c5c5c5" />

              <input 
                type="text" placeholder="Type your password" 
                id="password"
                name="password"
                                                    
                required                                                                                
                
                onChange={(e)=>setPassword(e.target.value)}
              />

              <div className="reveal">
                <FaEyeSlash color="#c5c5c5" />
              </div>
            </div>

            <div style={{color:"red"}}>{emailError}</div>

            <p className="forgot-password">
              <a>Forget password?</a>
            </p>

            <div className="button-container">
              <button type="submit"  onClick={onLogin}       >LOGIN</button>
            </div>
          </form>
        </div>
      </main>

      <p className="signuplink">
       <Link to="/signup">Sign Up if you dont have an account</Link> 
      </p>

      <div className="horizontal-line"></div>
      <Footer />
    </div>
  );
};

export default Login;
