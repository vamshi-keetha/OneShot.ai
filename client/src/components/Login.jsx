import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    let [userData,setUserData] = useState({});

    let navigate = useNavigate();

    let [otpFlag,setOtpFlag] = useState(0);

    let [generatedOtp,setGeneratedOtp] = useState();
    
    const onFormSubmit = (userCredentrialsObject) => {
      console.log(userCredentrialsObject);
  
      axios.post('http://localhost:5000/user-api/login',userCredentrialsObject)
      .then((response) => {
        console.log(response);
        alert(response.data.message);
        
        //if user  created
        if(response.data.message==='success')
        {
          setUserData(response.data.payload);
            setGeneratedOtp(response.data.otpValue);
          setOtpFlag(1);
        }
        // else if(response.data.message==='username has already taken'){
        //   alert('username has already taken');
        // }
      })
      .catch((error) => {
          console.log(error)
          // alert("Something went wrong in creating user")
        })
  
  
    }
  
  let [otp,setOtp] = useState();

  const checkOtp=()=>{
    console.log(otp,generatedOtp);
    console.log(typeof(generatedOtp),typeof(otp));
    if(otp==generatedOtp){
        alert("login success");
        window.localStorage.setItem("userloginstatus", JSON.stringify("true"));
        window.localStorage.setItem("userlogindata", JSON.stringify(userData));
        navigate('/booking');
        window.location.reload();
        
    }
    else{
        alert("enter correct otp");
    }
  }

  const changeOtp=(e)=>{
    console.log(e)
    setOtp(e);
  }
  
  return (
    <div>

        {otpFlag==0?(<>
            <form onSubmit={handleSubmit(onFormSubmit)}>



<div className='mx-auto border border rounded bg-white container m-5 p-5 col-xl-6'>

    <div className='display-5 mb-3 text-center text-dark' id="upload">Login</div>


    <div className="mb-3 row">
        <label for="staticEmail" className="col-sm-2 col-form-label" >Email</label>
        <div className="col-md-8">
            <input type="mail" readonly className="form-control" id="staticEmail" {...register("email", { required: true })} />
            {/* Error validation message for username */}
            {errors.email && <p className='text-danger'>*Email is required</p>}
        </div>
    </div>
    <div className="mb-3 row">
        <label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
        <div className="col-md-8">
            <input type="password" className="form-control" id="inputPassword" {...register("password", { required: true })} />
            {/* Error validation message for password */}
            {errors.password && <p className='text-danger'>*Password is required</p>}
        </div>
    </div>

    <button className='btn btn-primary' type="submit" >Login</button>


    <p className='text-center pt-2'>Don't you have Account? <Link to="/register">SignUp</Link></p>

</div>
</form>
        </>)
        :
        (<>
        <form>



<div className='mx-auto border border rounded bg-white container m-5 p-5 col-xl-6'>

    <div className='display-5 mb-3 text-center text-dark' id="upload">OTP</div>


    <div className="mb-3 row">
        <label for="staticEmail" className="col-sm-2 col-form-label" >OTP</label>
        <div className="col-md-8">
            <input type="number" readonly className="form-control" id="staticEmail" onChange={(e)=>changeOtp(e.target.value)} />
        </div>
    </div>

    <button className='btn btn-primary me-2' type="submit"  >Resend</button>

    
    <button className='btn btn-primary' type="submit" onClick={()=>checkOtp()} >Submit</button>
    

  

</div>
</form>
        </>)}






    </div>
  )
}

export default Login