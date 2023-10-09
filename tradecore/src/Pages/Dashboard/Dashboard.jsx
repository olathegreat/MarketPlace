import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { FaBars, FaHamburger, FaTrash, FaUser } from "react-icons/fa";
import Footer from "../../Components/Footer/Footer";
import { signOut } from "firebase/auth";
import { auth } from "../../packaages/firebase";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, removeCartItem } from "../../packaages/slice";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../packaages/firebase";

import { doc, deleteDoc } from "firebase/firestore";

const Dashboard = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.counter.userEmail);
  const navigate = useNavigate();
  const [menuActive, setMenuActive] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchPost = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setProducts([...products, ...newData]);
    console.log(newData);
  };

  useEffect(() => {
    let mounted = true;
    fetchPost();
    console.log(products.filter((item) => item.email === userEmail));

    return () => (mounted = false);
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(decrement());
        navigate("/");
        alert("logout");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const removeProduct = async (val) => {
    await deleteDoc(doc(db, "products", "val"));
  };

  const userItemsForSales = products
    .filter((item) => item.email === userEmail)
    .map((product, i) => (
      <div className="product-card" key={i}>
        <div className="image-container">
          <img src={product.image} alt="product image" />
        </div>

        <div className="product-description">
          <div className="upper">
            <p style={{ color: "#880725" }}> {product.name}</p>
            <p style={{ color: "grey" }}>
              &pound; {product.price ? product.price : ""}
            </p>
          </div>

          <p style={{ color: "grey" }} className="content">
            {product.description}
          </p>

          <div className="condition">
            <h4> {product.condition}</h4>

            {/* <div>
                   <button onClick={()=>removeProduct(product)}  style={{border:"none", backgroundColor:"lightgray", color:"#880725", padding:"10px 30px"}}>Delete</button>
                </div> */}
          </div>
          <p style={{ color: "Orange", marginTop: "20px" }}>{product.action}</p>
        </div>
      </div>
    ));

  return (
    <main className="dashboard">
      <section className="dashboard-wrapper">
        <div className="sidenav">
          <div className="sidenav-inner">
            <div className="profile-image">
              <FaUser color="white" />
            </div>
            <p style={{marginTop:"20px"}}>&#128994; Active</p>

            <div className="links">
              <Link to="/">Profile</Link>
              <Link to="/cartitems">Check Cart</Link>
              <Link to="/sell">Sell a Product</Link>
              <Link to="/#market">Explore Market</Link>
              <button onClick={handleLogout}>Sign Out</button>
            </div>
          </div>
        </div>

        <div className="dashboard-body">
          <div className="dashboard-main-body">
            <div className="sidenav mobile">
              <div className="upper-mobile">
                <h1>
                  <Link to="/">Tradecore</Link>
                </h1>
                <div onClick={()=>setMenuActive(!menuActive)} style={{fontSize:"20px", border:"1px solid white"}}>
                  <FaBars color="white" />
                </div>
              </div>
              <div className="mobile-nav" style={{display:menuActive ? "block" : "none"}}>
                <div className="links">
                  <Link to="/">Profile</Link>
                  <Link to="/cartitems">Check Cart</Link>
                  <Link to="/sell">Sell a Product</Link>
                
                  <button onClick={handleLogout}>Sign Out</button>
                </div>
              </div>
            </div>
            
            <p>You are already signed In</p>

            <Link to="/">Explore MarketPlace</Link>
          </div>

          <h1>Your product up for sale</h1>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {products.filter((item) => item.email === userEmail) === []
              ? "you are not selling any product for now"
              : userItemsForSales}
          </div>

          <Footer />
        </div>

        <div className="right"></div>
      </section>
    </main>
  );
};

export default Dashboard;
