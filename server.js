const express = require("express");
const User = require("./models/user"); // Import the User model
const connectDB = require("./config/db");
const authroutes=require("./routers/auth-route")
const app = express();
const port=7777;
const cors=require("cors");




app.use(express.json());
app.use(cors());
app.use('/api',authroutes)
// Middleware to parse incoming JSON
connectDB();




app.get("/",(req,res)=>{
    res.send("hello from the server")
})
// Register route


app.listen(port, () => {
  console.log("Server running on port ",port);
});
