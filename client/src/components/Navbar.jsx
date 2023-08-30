import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';

const Navbar = () => {

  let navigate = useNavigate();

  let [flag,setFlag]=useState(0);

  const logOutButton=()=>{
    window.localStorage.setItem("userloginstatus", JSON.stringify("false"));
        window.localStorage.setItem("userlogindata", JSON.stringify({}));
        navigate("/");
        window.location.reload();
  }
  
  return (
    <>
      <nav>
        <h2>
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
            Booking-App
          </Link>
        </h2>

       {JSON.parse(window.localStorage.getItem("userloginstatus"))!=="true"?(<>
        <Link to="/">
          <button>Login</button>
        </Link> 
       </>):(<>
        <Link to="/booking">
          <button>Book Now </button>
        </Link> 

        <Link to="/bookingstatus">
          <button>Book Status </button>
        </Link> 

        <Link >
          <button onClick={()=>logOutButton()}>Logout</button>
        </Link> 
       </>)}

        


        
      </nav>
    </>
  );
};

export default Navbar;
