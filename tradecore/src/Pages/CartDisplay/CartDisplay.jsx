import React, { useState, useRef } from "react";

import { useSelector } from "react-redux";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import "./CartDisplay.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { removeCartItem } from "../../packaages/slice";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../packaages/firebase";

const CartDisplay = () => {
  const cartItems = useSelector((state) => state.counter.cart);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");

  const removeFromCartItem = (val) => {
    dispatch(removeCartItem(val));
    alert("item removed");
  };

  const soldItem = async (e,val) => {
    e.preventDefault();
  
    setItemName(val);
    
    

    try {
      
      const docRef = await addDoc(collection(db, "soldItem"), {
        name: itemName,
        review: description,
      });

      console.log("Document written with ID: ", docRef.id);
      dispatch(removeCartItem(val));
      alert("item reviewed");

      navigate("/cartitems");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="cart-items-page">
      <Nav />

      <section className="checkcart-items">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="cart-item-bar"
            style={{ display: "flex" }}
          >
            <div className="product-image">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </div>

            <p>&pound; {item.price}</p>
            <p>{item.condition}</p>

            <div className="cart-item-buttons">
              {/* <a  href={`item.itemSellerEmail ? mailto: ${item.itemSellerEmail} : *`}>Message Seller</a> */}
             
              <form onClick={() => soldItem(item.id)}>
                <input value={description}  onChange={(e)=>setDescription(e.target.value)} placeholder="Review Seller after Purchase"/>
                <button type="submit">Bought</button>
              </form>
              <Link to={`/message/${item.email}`}>Message Seller</Link>
              <button onClick={() => removeFromCartItem(item)}>
                Remove Item
              </button>
            </div>
            {/* <div className='cart-item-buttons'>
                          <form onSubmit={soldItem}>
                            <input style={{display:"none"}} type='text' ref={inputRef} onChange={()=>console.log("changed")} value={item.id}/>
                            <input  type='text' ref={reviewRef} onChange={()=>console.log("changed")} value={itemDescription} placeholder='Reviw Seller AFter Purchase'/>
                             <button>Submit</button>
                          </form>
                        </div> */}
          </div>
        ))}
        {cartItems.length === 0 && (
          <div className="empty-cart">
            Your cart is empty
            <Link to="/">Go to Market Place</Link>
          </div>
        )}
        {cartItems.length !== 0 && <hr></hr>}
      </section>

      <Footer />
    </div>
  );
};

export default CartDisplay;
