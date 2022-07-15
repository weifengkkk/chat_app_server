const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./Routes/UserRoutes")

const app = express()
require('dotenv').config();

app.use(cors())
app.use(express.json())
app.use('/api',userRoutes);
mongoose.connect(process.env.MONGO_URL,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>{
    console.log(`connect successful! ${process.env.MONGO_URL}`);
}).catch((err)=>{console.log(err)})

const server =app.listen(process.env.PORT, ()=>{
    console.log(`Server Start on Port ${process.env.PORT}`);
}) 
