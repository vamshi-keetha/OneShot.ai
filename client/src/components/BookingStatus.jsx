import { useState, useEffect } from "react";
import 'bootstrap' 
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

const BookingStatus = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:5000/userslot-api/getuserslots"
      );
      const data = await response.json();
      setBookings(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setIsLoading(false);
    }
  };
const deleteslot = async(id) =>{
  console.log(id)
  const data ={
    id:id
  }
  
  axios.post('http://localhost:5000/userslot-api/removeuserslot/',data)
  .then((response) => {
    console.log(response);
    // Assuming response.data.message is a string, use strict comparison (===) instead of loose comparison (==)
    setFlag(flag+1);
      alert(response.data.message);
    
  })
  .catch((error) => {
    console.log(error);
    alert("Something went wrong: " + error.message); // Display an error message
  });
}
  useEffect(() => {
    fetchBookings();
  }, []);

  let [flag,setFlag] = useState(0);
  useEffect(() => {
    fetchBookings();
  }, [flag]);

  return (
    <>
      <div>
        <h2 className="statusHeading">Booking Status</h2>
        <div className="loading">{isLoading ? <h2>Loading...</h2> : null}</div>

        <table>
          <thead>
            <tr>
              <th>Facility Type</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>User</th>
              <th>Status</th>
              <th>Amount</th> 
              <th>Delete </th>
            </tr>
          </thead>
          <tbody>
            {bookings
              ? bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.facilityType}</td>
                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                    <td>{booking.startTime}</td>
                    <td>{booking.endTime}</td>
                    <td>{booking.user}</td>
                    <td>{booking.status}</td>
                    <td>Rs.{booking.amount}</td> 
                    <td><button className="btn btn-danger" onClick={()=>deleteslot(booking._id)}>Delete</button></td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BookingStatus;
