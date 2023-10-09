import React,{useEffect, useState} from 'react'
import "./Search.css"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../packaages/firebase";
import { FaEnvelope, FaShoppingCart } from "react-icons/fa";
import { addToCart, removeCartItem } from "../../packaages/slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';


const Search = () => {

    const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [setter, setSetter] = useState(true);
  const navigate = useNavigate();
  const { search } = useParams();

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
    console.log(val);

    dispatch(addToCart(val));
    setSetter(!setter);
  };
  const removeFromCartItem = (val) => {
    dispatch(removeCartItem(val));
    alert("item removed");

    setSetter(!setter);
  };


  const signin = useSelector((state) => state.counter.value);
  const Navigate = useNavigate();
  const cartItems = useSelector((state) => state.counter.cart);
  const [searchTerm, setSearchTerm] = useState("");

  const cartClicked = () =>{
    if(!signin){
      alert("sign or sign up to view your cart")
    }else{
      Navigate("/cartitems")

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






















  const displayProducts = products.filter((item) => item.name.toLocaleLowerCase() === search.toLocaleLowerCase()).map((product, i) => (
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


  const allProducts = products.map((product, i) => (
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
    <div className='search'>
        {/* <Nav/> */}



        <nav className="Nav">
      <div className="Nav-wrapper">
        <div className="nav-left">
          {/* <span className="nav-logo-container">
            <img src="img/tradecore.png" alt="tradecore" />
          </span> */}

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
        <main className='search-main'>

            <div className='product-container'>
                        {
                           displayProducts 
                        }

                        {
                            products.filter((item) => item.name === search) == "" 
                            
                            &&
                            
                            (
                                <div>
                                    <p style={{textAlign:"center", color:"grey", fontSize:"1.2em"}}>No Results</p>

                                    {/* <div className='empty-search-wrapper'>

                                       {
                                        allProducts
                                       }
                                   </div> */}
                                </div>
                            )
                            // alert(products.filter((item) => item.name === search))
                        }

            </div>

           

        </main>
        <Footer/>

    </div>
  )
}

export default Search