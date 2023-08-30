
import {useForm} from "react-hook-form"
import {useState} from 'react'
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap'
import axios from 'axios'



function Signup(){

    const {register,handleSubmit,formState:{errors}}=useForm() 

    let [usersList,setusersList]=useState([])
  
  
    // form submission
    const onFormSumbit=(userobj)=>{
      // http post req
      axios.post('http://localhost:2222/user-api/create-user',"userobj")

.then(response=>{
  console.log(response);
  alert("user created successdfully")
})    
.catch(error=>alert("sometihng went worng"))
  }


    return(
<div  className="container-fluid">
          <form className=" text-center mx-auto" onSubmit={handleSubmit(onFormSumbit)}>
    {/* username */}
    <div className="mb-3 p-2">
      <label htmlFor="username">username</label>
      <input type="text" name=""  id="username" className='form-control' {...register("username",{required:true,minLength:4})} />
      {/* validation of form */}
      {errors.username?.type==='required' && <p className="text-danger">* username is required</p>}
      {/* minlength validation */}
      {errors.username?.type==='minLength' && <p className="text-center">* atleast 4 characters required</p>}
    </div>
    {/* email */}
    <div className="mb-3 p-2">
      <label htmlFor="email">email</label>
      <input type="email" name=""  id="email" className='form-control' {...register("email",{required:true})} />
      {errors.username?.type==='required' && <p className="text-danger">* email is required</p>}
    </div>
    {/* dob */}
    <div className="mb-3">
      <label htmlFor="dob">date of birth</label>
      <input type="date" name=""  id="dob" className='form-control' {...register("dob",{required:true})} />
      {errors.username?.type==='required' && <p className="text-danger">* date of birth is required</p>}

    </div>

 {/* skills */}

<div className="mb-3">
  
   </div>

    {/* submit button */}
<button type="submit" className="btn btn-success d-block mx-auto ">add user</button>

   </form>
        </div>
    );
}

export default Signup;