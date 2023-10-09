import React, {useState} from "react";
import "./Nav.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Nav = () => {
  const signin = useSelector((state) => state.counter.value);
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.counter.cart);
  const [searchTerm, setSearchTerm] = useState("");

  const cartClicked = () =>{
    if(!signin){
      alert("sign or sign up to view your cart")
    }else{
      navigate("/cartitems")

    }
  }


  const onFormSubmit = (e) =>{
    e.preventDefault();

    if(searchTerm===""){
      alert("input a search term")
    }else{
      
      navigate(`/search/${searchTerm}`);

    }

    
    
    
  }
  return (
    <nav className="Nav">
      <div className="Nav-wrapper">
        <div className="nav-left">
          <span className="nav-logo-container">
            <img src="img/tradecore.png" alt="tradecore" />
          </span>

          <span className="nav-logo-select">
            {/* <select>
                        <option>Language Option</option>
                    </select> */}
            <h1>
              <Link to="/">TradeCore</Link>
            </h1>
          </span>
        </div>


        <div className="nav-center">

          <Link to="/">Home</Link>
          <Link to="/about">About</Link>


          <form onSubmit={onFormSubmit}>

          <input
           type="text"
           value={searchTerm}
           onChange={(e)=>setSearchTerm(e.target.value)}
            placeholder="search for products with name, category"/>
          <button>Search</button>

          </form>
        
          {/* <Link to="/search/">Search</Link> */}

        </div>

        <div className="nav-right">
          <Link to={`${!signin ? "/": "/cartitems"}`} onClick={cartClicked}>
            <div className="cart-update" style={{display:"flex", alignItems:"center"}}>
              <FaShoppingCart />
              <p style={{ color: "red", marginLeft:"-5px", marginTop:"-20px", background:"white",boxShadow:"1px 1px 4px grey", borderRadius:"50%",padding:"5px 10px" }}>{cartItems.length}</p>
            </div>
          </Link>

          {!signin ? (
            <Link to="/login">Sign In</Link>
          ) : (
            <Link to="/dashboard">Dashboard</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
