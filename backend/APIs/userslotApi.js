const exp = require('express');
const userslotApp  = exp.Router();
const expressAsyncHandler = require('express-async-handler');


//to extract the body of request object
userslotApp.use(exp.json())


//creating userslot REST API

  


//Adding userslot to the collection
  userslotApp.post('/adduserslot',expressAsyncHandler(async(req,res)=>{
    
    //get userslotCollectionObject
    let userslotCollectionObject = req.app.get("userslotCollectionObject");

    //get userslot obj from req
    let userslotObj = req.body

    try {
        let { facilityType, date, startTime, endTime, user } = req.body;
        let amount = 0;
        startTime = startTime.slice(0, 2);
        endTime = endTime.slice(0, 2);
    
        if (facilityType === "Clubhouse") {
          if (startTime >= 10 && endTime <= 16) {
            amount = 100 * (Number(endTime) - Number(startTime));
          } else if (startTime >= 16 && endTime <= 22) {
            amount = 500 * (Number(endTime) - Number(startTime));
          }
        } else if (facilityType === "Tennis Court") {
          amount = 50 * (Number(endTime) - Number(startTime));
        }
    
        startTime += ":00";
        endTime += ":00";
    
        // Check if the booking already exists in the database
        const existingBooking = await userslotCollectionObject.findOne({
          facilityType,
          date,
          startTime,
          endTime,
        });
    
        if (existingBooking) {
          // Booking already exists
          res.status(409).json({
            message: "Booking Failed , Already Booked", 
            
          });
        } else {
          // Create the booking record
          const booking = {
            facilityType:facilityType,
            date:date,
            startTime:startTime,
            endTime:endTime,
            user:user,
            status: "Booked",
            amount:amount,
          };
    
          await userslotCollectionObject.insertOne(booking);
    
          res.status(201).json({ message: "Booking successful", data: booking });
        }
      } catch (error) {
        res.status(500).json({ message: "Booking failed", error: error.message });
      }

}));




//check the availability of the slots
userslotApp.post('/checkavailability',expressAsyncHandler(async(req,res)=>{
    
    //get userslotCollectionObject
    let userslotCollectionObject = req.app.get("userslotCollectionObject");

    //get userslot obj from req
    let userslotObj = req.body


    try {
        const { facilityType, date, startTime, endTime } = req.body;
    
        // Check if there are any bookings for the same facility, date, and time
        const existingBooking = await userslotCollectionObject.findOne({
          facilityType,
          date,
          $or: [
            { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
            { startTime: { $gte: startTime, $lte: endTime } },
            { endTime: { $gt: startTime, $lte: endTime } },
          ],
        });
    
        if (existingBooking) {
          // Facility is already booked for the requested date and time
          res.status(409).json({
            message: "Facility not available for booking",
            error: "Already Booked", 
            // alert(AlreadyBooked)
          });
        } else {
          // Facility is available for booking
          res.status(200).json({ message: "Facility available for booking" });
        }
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error checking availability", error: error.message });
      }

}));


//get all userslots data
userslotApp.get('/getuserslots',expressAsyncHandler(async(req,res)=>{

    //get userslotCollectionObject
    let userslotCollectionObject = req.app.get("userslotCollectionObject");

    try {
        const bookings = await userslotCollectionObject.find().toArray()
        res.status(200).json({ data: bookings });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error retrieving bookings", error: error.message });
      }
}));

const { ObjectId } = require('mongodb');

userslotApp.post('/removeuserslot',expressAsyncHandler(async(request,response)=>{

  //get userCollectionObject
  let userslotCollectionObject = request.app.get("userslotCollectionObject");

  //get userId from url parameter
  

  let userObj=request.body

  console.log(userObj.id)

  let pid = new ObjectId(userObj.id)

  console.log(pid)
  
  //get user by id
  let user = await userslotCollectionObject.findOne({_id:pid});

  console.log(user)
  //if user not existed
  if(user==null){
      response.send({message:"userSlot is not existed"});
  }
  //if user existed
  else{

      await userslotCollectionObject.deleteOne({_id:pid});
      response.send({messagae:"userSlot Deleted Successfully"});
  }

}));

//export userslotApp
module.exports=userslotApp;