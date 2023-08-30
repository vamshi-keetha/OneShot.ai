import { useState } from "react";
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';


import styles from '../styles/css/register.module.css';

const API_BASE_URL = "http://localhost:5000/userslot-api/adduserslot";

const BookingForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const initialFormData = {
    facilityType: "",
    date: "",
    startTime: "",
    endTime: "",
    user: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(JSON.stringify(formData))
    fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        
        alert(`${data.message},Your booking amount is Rs.650`);
        setFormData(initialFormData);
      })
      .catch((error) => {
        console.error("Booking failed:", error); 
        alert(`Please Choose Another Slot`);
        setIsLoading(false);
      });
  };


  const formik = useFormik({
    initialValues : {
      username : 'example123'
    },
   
    onSubmit : async values => {
      setUsername(values.username);
      navigate('/password')
    }
  })

  return (
    <>





      <div className="formContainer">
        <h2>Booking Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Facility Type *</label> <br />
            <select
              name="facilityType"
              value={formData.facilityType}
              onChange={handleChange}
              required
            >
              <option value="">Select Facility Type</option>
              <option value="Clubhouse">Clubhouse</option>
              <option value="Tennis Court">Tennis Court</option>
            </select>
          </div>
          <div>
            <label>Date *</label> <br />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Start Time *</label> <br />
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>End Time *</label> <br />
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>User *</label> <br />
            <input
              type="text"
              name="user"
              placeholder="Enter your name"
              value={formData.user}
              onChange={handleChange}
              required={true}
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {" "}
            {isLoading ? "Please wait..." : "Book Now"}
          </button>
        </form>
      </div>
    </>
  );
};

export default BookingForm;
