const exp = require("express");
const res = ("express/lib/response");
const app = exp();
const mclient = require("mongodb").MongoClient;
var cors = require('cors')

app.use(cors())

//import path module
const path = require('path');


//connect app ith nodejs
app.use(exp.static(path.join(__dirname,'../e-commerce-project')));


//Extracting body of request object
app.use(exp.json());


//DB Connection URL
const DBurl = "mongodb+srv://vamshik:vamshik@cluster0.rhqxtjo.mongodb.net/?retryWrites=true&w=majority";


//connect with mongodb server
mclient.connect(DBurl)
.then((client)=>{

    //get DB object
    let dbObj = client.db("slots");

    //create collection objects
    let userslotCollectionObject = dbObj.collection("user-slot");
    let userCollectionObject = dbObj.collection("userdata");
    

    //sharing collection object to APIs
    app.set("userslotCollectionObject",userslotCollectionObject);
    app.set("userCollectionObject",userCollectionObject);

    console.log("DB connection is success");

})
.catch(err=>console.log("Error in DB connection",err))


//import userslotApp and productApp
const userApp = require('./APIs/userApi');
const userslotApp = require('./APIs/userslotApi');

//create specific middleware based on path
app.use('/userslot-api',userslotApp)//so when we get user-api name then it calls userApp and goes into that file
app.use('/user-api',userApp)

// //dealing with page refresh
// app.use('*',(request,response)=>{
//     response.sendFile(path.join(__dirname,'./build/index.html'));
// });

//Handling invalid paths middleware
app.use((request,response,next)=>{
    response.send({message:`path ${request.url} is invalid`});
});

//Error Handling middleware
app.use((error,request,response,next)=>{
    response.send({message:"Error Occured",reason:`${error.message}`})
});

//Assigning port number
app.listen(5000,()=>console.log('Server listening on port 5000...'));