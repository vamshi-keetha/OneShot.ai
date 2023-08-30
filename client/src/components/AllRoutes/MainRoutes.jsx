import { Routes, Route } from "react-router-dom";
import BookingStatus from "../BookingStatus";
import BookingForm from "../BookingForm";
import Register from "../Register";
import Login from "../Login";

// import login from './components/loginSignup'
const MainRoutes = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/bookingstatus" element={<BookingStatus />}></Route>
          <Route path="/booking" element={<BookingForm />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Login />}> </Route>
        </Routes>
      </div>
    </>
  );
};

export default MainRoutes;
