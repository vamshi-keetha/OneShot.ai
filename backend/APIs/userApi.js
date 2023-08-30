const exp = require('express');
const userApp  = exp.Router();
const expressAsyncHandler = require('express-async-handler');

const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");



//to extract the body of request object
userApp.use(exp.json())


//creating user REST API

//create a route to handle '/getusers'
userApp.get('/getusers',expressAsyncHandler(async(request,response)=>{

    //get userCollectionObject
    let userCollectionObject = request.app.get("userCollectionObject");

    //read allusers 
    let user = await userCollectionObject.find().toArray()

    //check if no users are present in the collection
    if(user.length==0){
        response.send({message:"No users to show"})
    }
    //if users present in the collection
    else{
        response.send({message:"All users",payload:user});
    }

}));



//create a route to handle a specific user '/getuser/id'
userApp.get('/getuser/:id',expressAsyncHandler(async(request,response)=>{
    
    //get userCollectionObject
    let userCollectionObject = request.app.get("userCollectionObject");
    
    //get userId from url parameter
    let pid = (+request.params.id);
    
    //get user by id
    let user = await userCollectionObject.findOne({userId:pid});

    //if user not existed
    if(user==null){
        response.send({message:"user is not existed"});
    }
    //if user existed
    else{
        response.send({messgae:"user existed",payload:user});
    }

}));

//create a route to handle '/checkuser'
userApp.post('/checkuser',expressAsyncHandler(async(request,response)=>{
    
    console.log(request.body);
    //get userCollectionObject
    let userCollectionObject = request.app.get("userCollectionObject");

    //get user obj from req
    let newuserObj = request.body

    //search for user by username
    let userOfDb = await userCollectionObject.findOne({email:newuserObj.email});

    console.log(userOfDb)

    if(userOfDb!=null){
        response.send({message:"username has already taken"});
    }
    else{
    //send respone
    response.send({message:"user name not taken"});
    }
}));

//create a route to handle '/createuser'
userApp.post('/adduser',expressAsyncHandler(async(request,response)=>{
    
    console.log(request.body);
    //get userCollectionObject
    let userCollectionObject = request.app.get("userCollectionObject");

    //get user obj from req
    let newuserObj = request.body

    //search for user by username
    let userOfDb = await userCollectionObject.findOne({email:newuserObj.email});

    if(userOfDb!=null){
        response.send({message:"username has already taken"});
    }
    else{
        //insert userObj
    let result = await userCollectionObject.insertOne(newuserObj);

    //send respone
    response.send({message:"user created successfully"});
    }
}));

//create a route to handle '/login'
userApp.post('/login',expressAsyncHandler(async(request,response)=>{
    
    //get userCollectionObject
    let userCollectionObject = request.app.get("userCollectionObject");

    //get user obj from req
    let newuserObj = request.body

    //search for user by username
    let userOfDb = await userCollectionObject.findOne({email:newuserObj.email});

    console.log(userOfDb);

    if(userOfDb==null){
        response.send({message:"Invalid Username"});
    }
    else{
        let userOfDb = await userCollectionObject.findOne({$and:[{email:newuserObj.email},{password:newuserObj.password}]});
        console.log(userOfDb,newuserObj)
        if(userOfDb==null){
            response.send({message:"Invalid Password"});
        }
        else{


            let nodeConfig = {
                service: "gmail",
              auth: {
                  user: "mandaakash6@gmail.com",
                  pass: "eaea gcls nege aahs"
              }
            }
            
            let transporter = nodemailer.createTransport(nodeConfig);
            
            let MailGenerator = new Mailgen({
                theme: "default",
                product : {
                    name: "Mailgen",
                    link: 'https://mailgen.js/'
                }
            })

            const OTP = Math.floor(100000 + Math.random() * 900000);
      console.log('Generated OTP:', OTP);
// console.log(secret);
    // body of the email
    var email123 = {
        body : {
            name: userOfDb.username,
            intro : `otp : ${OTP}`,
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }

    var emailBody = MailGenerator.generate(email123);

    let message = {
        // from : "serena.stehr@ethereal.email",
        to: newuserObj.email,
        subject :  "Login OTP",
        html : emailBody
    }

    // send mail
    transporter.sendMail(message)
        .then(() => {
            // return res.status(200).send({ msg: "You should receive an email from us."})
            console.log("succees");
        })
        .catch(error => res.status(500).send({ error }))






            //send respone
    response.send({message:"success",payload:userOfDb,otpValue:OTP});
        }
    
    }
}));



//create a route to handle '/updateuser'
userApp.post('/updateuser',expressAsyncHandler(async(request,response)=>{
    
    //get userCollectionObject
    let userCollectionObject = request.app.get("userCollectionObject");

    //get modified user obj
    let modifieduser = request.body;

    console.log('pp',modifieduser);

    //update data
    await userCollectionObject.updateOne({email:modifieduser.email},{$set:{cart:modifieduser.cart}});

    //send response
    response.send({messgae:"user details is modified Successfully"});

}));


//create a route to handle '/removeuser/id'
userApp.delete('/removeuser/:id',expressAsyncHandler(async(request,response)=>{

    //get userCollectionObject
    let userCollectionObject = request.app.get("userCollectionObject");

    //get userId from url parameter
    let pid = (+request.params.id);

    //get user by id
    let user = await userCollectionObject.findOne({userId:pid});

    //if user not existed
    if(user==null){
        response.send({message:"user is not existed"});
    }
    //if user existed
    else{

        await userCollectionObject.deleteOne({userId:pid});
        response.send({messgae:"user Deleted Successfully"});
    }

}));


//export userApp
module.exports=userApp;