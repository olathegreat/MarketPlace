import React, { useState } from "react";
import {
  FaShoppingBag,
  FaFile,
  FaStar,
  FaBook,
  FaMoneyBill,
  FaTag,
  FaLocationArrow,
} from "react-icons/fa";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../packaages/firebase";
import { useDispatch } from "react-redux";

import Footer from "../../Components/Footer/Footer";

import Nav from "../../Components/Nav/Nav";
import { useNavigate } from "react-router-dom";
import "./SellItem.css";

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Modal from "../../Components/Modal/Modal";

const SellItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemSellerEmail, setItemSellerEmail] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemCondition, setItemCondition] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemImage, setItemImage] = useState("");
  const [item, setItem] = useState({});
  const [itemLocation, setItemLocation] = useState("Cavendish");
  const [itemAction, setItemAction] = useState("Selling");
  const [modal, setModal] = useState(false);
  // /////////////////////////
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        
        });
      }
    );
  };

  // ////

  const sellItem = async (e) => {
    e.preventDefault();
    setItem({
      name: itemName,
      description: itemDescription,
      condition: itemCondition,
      // image: itemImage,
    });

    setItems([...items, item]);

    try {
      const docRef = await addDoc(collection(db, "products"), {
        name: itemName,
        email: itemSellerEmail,
        description: itemDescription,
        condition: itemCondition,
        price: itemPrice,
        action: itemAction,
        location: itemLocation,
        image: imgUrl,
      });

      console.log("Document written with ID: ", docRef.id);
      alert("posted for sales");
      // navigate("/#market");
      setModal(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
  };
  return (
    <div className="sellItems" style={{position:"relative"}}>
      <Nav />

      <main className="login-main">
        <div className="login-content-wrapper">
          <div className="login-content-img">
            <img src="img/tradecore.png" alt="TradeCore logo" />
          </div>

          <h1 style={{ color: "#880725", margin: "50px" }}>
            Post a <span style={{ color: "black" }}>Product</span>
          </h1>

          <div className="App">
            <form onSubmit={handleSubmit} className="form">
              <label>Upload Product image</label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input type="file" style={{color:"#880725"}} required/>
                <button
                  type="submit"
                  style={{ background: "grey", padding: "10px" }}
                >
                 Upload
                </button>
              </div>
              <p style={{ color: "lightred" }}>
                Click upload ,Image size must not be greater than 1MB...
              </p>
            </form>
            {!imgUrl && (
              <div className="outerbar">
                <div className="innerbar" style={{ color: "grey" }}>
                  image will display after successful upload,wait a bit...
                </div>
              </div>
            )}
            {imgUrl && (
              <img
                src={imgUrl}
                alt="uploaded file"
                style={{ width: "200px", height: "200px" }}
              />
            )}
          </div>

          <form onSubmit={sellItem} style={{ marginTop: "30px" }}>
            <div className="input-container">
              <FaShoppingBag color="#c5c5c5" />

              <input
                type="text"
                placeholder="Name of item"
                required
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>

            <div className="input-container">
              <FaShoppingBag color="#c5c5c5" />

              <input
                type="email"
                placeholder="Your university email"
                required
                onChange={(e) => setItemSellerEmail(e.target.value)}
              />
            </div>

            <div className="input-container">
              <FaBook color="#c5c5c5" />

              <input
                type="text"
                required
                placeholder="Type in item description"
                onChange={(e) => setItemDescription(e.target.value)}
              />
            </div>

            <div className="input-container">
              <FaMoneyBill color="#c5c5c5" />

              <input
                type="number"
                required
                placeholder="Price in Pounds"
                onChange={(e) => setItemPrice(e.target.value)}
              />
            </div>

            <div style={{ color: "grey" }}>Product condition</div>

            <div
              className="input-container radios"
              style={{
                border: "none",
                display: "flex",
                justifyContent: "none",
              }}
            >
              <FaStar color="#c5c5c5" />
              <input
                name="condition"
                value="very Good"
                type="radio"
                onChange={(e) => setItemCondition(e.target.value)}
              />{" "}
              <label>Very Good</label>
              <input
                name="condition"
                value="Fairly used"
                type="radio"
                onChange={(e) => setItemCondition(e.target.value)}
              />{" "}
              <label>Fairly used</label>
              <input
                name="condition"
                value="Needs fixes"
                type="radio"
                onChange={(e) => setItemCondition(e.target.value)}
              />{" "}
              <label>Need Fixes</label>
              {/* <input
                type="text"
                required
                placeholder="Condition of item e.g Very good, bad, need fixed"
                maxLength="15"
                onChange={(e) => setItemCondition(e.target.value)}
              /> */}
            </div>

            <div className="input-container">
              <FaTag color="#c5c5c5" />

              <select
                style={{ width: "" }}
                onChange={(e) => setItemAction(e.target.value)}
              >
                <option>Selling</option>
                <option>Free</option>
                <option>Exchange</option>
              </select>
            </div>
            <div style={{ color: "grey", marginBottom:"15px" }}>PickUp Location</div>
            <div className="input-container">
              <FaLocationArrow color="#c5c5c5" />

              <select
                style={{ width: "" }}
                required
                onChange={(e) => setItemLocation(e.target.value)}
              >
                <option>Cavendish</option>
                <option>Harrow</option>
                <option>Regent</option>
                <option>Marylebone</option>
              </select>
            </div>
            {/* <div className="input-container" style={{ color: "grey" }}>
              <FaFile color="#c5c5c5" />

              <input type="file" onChange={(e) => handleSubmit(e)} />
            </div> */}

            <div className="button-container">
              <button type="submit">Post Item</button>
            </div>
          </form>
        </div>

       
      </main>
       <div style={{display:modal? "flex" : "none"}} className="modmod">
          <Modal/>
       </div>
      <Footer />
    </div>
  );
};

export default SellItem;
