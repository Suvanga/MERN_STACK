import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import  mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
const app = express();

app.use(express.json());

//Middle ware for managing CORS policy which basically is a security policy which does not let unauthoriced people to accesss and modify the resources from the web
app.use(cors())


app.get("/",(req,res)=>
{
    // console.log(req);
    return res.status(200).send("The app is functioning properly");
})

app.use('/books',booksRoute);
mongoose.connect(mongoDBURL).then(()=>{
console.log('App is connected to the database')
app.listen(PORT, ()=>
{
  console.log(`APP IS CONNECTED TO THE PORT ${PORT}`)
})
})
.catch((error)=>{
console.log(error)
});



