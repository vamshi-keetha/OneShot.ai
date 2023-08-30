import React from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { userLogin } from '../../../slices/customerSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { updateCartData, clearcartlocaldata } from '../../../slices/userSlice.js';
import { Link } from 'react-router-dom';
import Footer from '../../footer/Footer';

function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    //get user state from redux
    let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector(state => state.customer);

    //get dispatch function to call action creator functions
    let dispatch = useDispatch();

    //when login form is submitted
    const onFormSubmit = (userCredentrialsObject) => {
        // console.log(userCredentrialsObject)

        dispatch(userLogin(userCredentrialsObject))

        // if(userCredentrialsObject.userType === "user"){
        //   //Dispatch the data
        //   dispatch(userLogin(userCredentrialsObject))
        // }

        // if(userCredentrialsObject.userType === "admin"){
        //   alert("Admin development in progesss")
        // }
    };

    //get navigate function to navigate programatically
    let navigate = useNavigate();

    //this to be excuted when either isSuccess or isError changed
    useEffect(() => {
        if (isSuccess) {

            dispatch(clearcartlocaldata())

            dispatch(updateCartData(userObj.productsincart))

            console.log("cart updated")

            navigate("/");
        }
    }, [isSuccess, isError]);



    return (
        <div className=''>

            <form onSubmit={handleSubmit(onFormSubmit)}>



                <div className='mx-auto border border rounded bg-white container m-5 p-5 col-xl-6'>

                    <div className='display-5 mb-3 text-center text-dark' id="upload">Login</div>


                    <div className="mb-3 row">
                        <label for="staticEmail" className="col-sm-2 col-form-label" >Email</label>
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

                    <button className='btn btn-primary' type="submit" >Login</button>


                    <p className='text-center pt-2'>Don't you have Account? <Link to="/signup">SignUp</Link></p>

                </div>
            </form>
            <Footer />
        </div>
    )
}

export default Login