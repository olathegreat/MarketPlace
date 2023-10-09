import React, { useEffect } from 'react';


function Chatra({ sellerEmail }) {
    useEffect(() => {
      window.Chatra('setChatraID', 'iWqY2nSJnGJziKEpc');
      window.Chatra('setEmail', sellerEmail);
    }, [sellerEmail]);
  
    return null;
  }


  export default Chatra;