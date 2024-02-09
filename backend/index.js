import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import  mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";
const app = express();

app.use(express.json());
app.get("/",(req,res)=>
{
    // console.log(req);
    return res.status(200).send("The app is functioning properly");
})
//Route for Saving a new book

app.post('/books', async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: 'Send all required fields: title, author, publishYear',
        });
      }
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };
  
      const book = await Book.create(newBook);
      console.log(book)
      return response.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });


//Routes for getting all routes from database

app.get('/books',async (request,response)=>{

    try
    {
        const books = await Book.find({})
        return response.status(200).json({
            count:books.length,
            data: books
        });
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message})

    }
});


//ROutes for getting information of the books from its id similar to having a product description:)
app.get('/books/:id',async (request,response)=>
{
    try
    {
        const {id} = request.params;
        

        const book = await Book.findbyID(id);
        return response.status(200).json(book);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message})

    }
});






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



