import React, { useState, useEffect } from "react";
import "./SalesItems.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../packaages/firebase";
import { FaEnvelope, FaShoppingCart } from "react-icons/fa";
import { addToCart, removeCartItem } from "../../packaages/slice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Message from "../Message/Message";

const SalesItems = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [setter, setSetter] = useState(true);
  const navigate = useNavigate();

  const fetchPost = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setProducts([...products, ...newData]);
    
  };

  useEffect(() => {
    let mounted = true;
    fetchPost();

    return () => (mounted = false); // cleanup function
  }, []);

  const addToCartFunction = (val) => {
    

    dispatch(addToCart(val));
    setSetter(!setter);
  };
  const removeFromCartItem = (val) => {
    dispatch(removeCartItem(val));
    alert("item removed");

    setSetter(!setter);
  };

  const displayProducts = products.map((product, i) => (
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

          <div>
            <span
              className="icon"
              // onClick={()=>{setter ? addToCartFunction(product) : removeFromCartItem(product)}}
              onClick={() => addToCartFunction(product)}
            >
              <FaShoppingCart />
            </span>
            <span
              style={{ color: "grey" }}
              className="icon"
              onClick={() => navigate(`/message/${product.email}`)}
            >
              {/* <a href={`mailto:product.itemSellerEmail`}>
                      
                      </a> */}
              <FaEnvelope />
              {/* <div style={{display:"none"}}>
                <Message sellerEmail={product.itemSellerEmail} />
              </div> */}
            </span>
          </div>
        </div>
        <div style={{display:"flex", justifyContent:"space-between"}}>
            <p style={{ color: "Orange" }}>{product.action}</p>
            <p style={{ color: "Grey" }}>{product.location}</p>

        </div>
      

      </div>
    </div>
  ));

  return (
    <section id="market" className="product-container">
      <h1>MarketPlace</h1>
      <div className="products-sale">
        {products !== "" ? displayProducts : <div>loading</div>}
      </div>
    </section>
  );
};

export default SalesItems;
