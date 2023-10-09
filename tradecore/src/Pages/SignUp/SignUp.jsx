import React, { useState } from "react";
import Nav from "../../Components/Nav/Nav";
import "./SignUp.css";
import { useSelector, useDispatch } from "react-redux";
import {
  FaLock,
  FaEnvelope,
  FaEyeSlash,
  FaUser,
  FaPhone,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
import { decrement, increment, userEmailFunction } from "../../packaages/slice";
import { auth } from "../../packaages/firebase";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    
    if (
      email.indexOf("@student.oauife.edu.ng") !== -1 ||
      email.indexOf("@oauife.edu.ng") !== -1
    ) {
    
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            dispatch(increment());
            console.log(user);
            dispatch(userEmailFunction(email));
            navigate("/dashboard")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            setEmailError(errorMessage);
            // ..
        });
    } else {
      alert(" wrong email, use your westminster university email");
    }
  };

  return (
    <div className="signup">
      <Nav />

      <main className="login-main">
        <div className="login-content-wrapper">
          <div className="login-content-img">
            <img src="img/tradecore.png" alt="TradeCore logo" />
          </div>

          <h1>Welcome to TradeCore</h1>

          <p className="login-description">
            As a registered user, you'll have access to a variety of features,
            including the ability to browse and purchase items from multiple
            vendors, track your orders, and leave reviews for products and
            vendors.
          </p>

          <form onSubmit={onSubmit}>
            <div className="input-container">
              <FaUser color="#c5c5c5" />

              <input type="text" placeholder="Type  your full name" />
            </div>

            <div className="input-container">
              <FaEnvelope color="#c5c5c5" />

              <input
                type="email"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address"
              />
            </div>

            {/* <div className="input-container">
              <FaPhone color="#c5c5c5" />

              <input
                type="text"
                placeholder="Type  in your mobile number"
              />
            </div> */}

            <div className="input-container">
              <FaLock color="#c5c5c5" />

              <input
                type="password"
                label="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                minLength="6"
                // pattern="[A-Za-z0-9\(\)._\-‘]+"
              />
            </div>

            <div className="input-container">
              <FaLock color="#c5c5c5" />

              <input type="text" placeholder="Confirm password" />
            </div>

            <div className="button-container">
              <button type="submit">Sign Up</button>
            </div>
            <div>{emailError}</div>
          </form>
        </div>
      </main>

      <p className="signuplink">
        <Link to="/login">Sign In if you have an account</Link>
      </p>

      <div className="horizontal-line"></div>
      <Footer />
    </div>
  );
};

export default SignUp;
