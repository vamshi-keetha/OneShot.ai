import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Register() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  let navigate = useNavigate();
  
  const onFormSubmit = (userCredentrialsObject) => {
    console.log(userCredentrialsObject);

    axios.post('http://localhost:5000/user-api/adduser',userCredentrialsObject)
    .then((response) => {
      console.log(response);
      alert(response.data.message);
      
      //if user  created
      if(response.data.message==='user created successfully')
      {
        //navigate to login
        navigate('/');
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

  return (
    <div>


<form onSubmit={handleSubmit(onFormSubmit)}>



<div className='mx-auto border border rounded bg-white container m-5 p-5 col-xl-6'>

    <div className='display-5 mb-3 text-center text-dark' id="upload">Register</div>


    <div className="mb-3 row">
        <label for="staticEmail" className="col-sm-2 col-form-label" >Email</label>
        <div className="col-md-8">
            <input type="email" readonly className="form-control" id="staticEmail" {...register("email", { required: true })} />
            {/* Error validation message for username */}
            {errors.email && <p className='text-danger'>*Email is required</p>}
        </div>
    </div>
    <div className="mb-3 row">
        <label for="staticUsername" className="col-sm-2 col-form-label" >Username</label>
        <div className="col-md-8">
            <input type="text" readonly className="form-control" id="staticEmail" {...register("username", { required: true })} />
            {/* Error validation message for username */}
            {errors.username && <p className='text-danger'>*Username is required</p>}
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

    <button className='btn btn-primary' type="submit" >Signup</button>


    <p className='text-center pt-2'>Do you have Account? <Link to="/login">Login</Link></p>

</div>
</form>
    </div>
  )
}

export default Register