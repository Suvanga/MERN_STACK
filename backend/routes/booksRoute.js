
import express from 'express';
import {Book} from '../models/bookModel.js'


const router = express.Router();



//Route for Saving a new book

router.post('/', async (request, response) => {
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

router.get('/',async (request,response)=>{

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
router.get('/:id',async (request,response)=>
{
    try
    {
        const {id} = request.params;

        const book = await Book.findById(id);
        return response.status(200).json(book);
    }
    catch(error){
        console.log(error.message);
        response.status(500).json({message:error.message})

    }
});

//ROute for updating a book is made now 
router.put('/:id', async(request,response)=>
{
    try
    {
        if(
            !request.body.title||
            !request.body.author||
            !request.body.publishYear
        ){
            return response.status(400).send({message:"PLease enter the required field in order to proceed forward"})
        }
        const {id} = request.params;
        const result = await Book.findByIdAndUpdate(id,request.body);

        if(!result){
            return response.status(500).json({message:"Book is not found"})
        }
        else{
            return response.status(200).send({message:'Book updated successfully'})
        }
    }catch(error){  
        console.log(error.message);
        response.status(500).send({message:error.message})
    }
})


// ROute for deleting a book is made now :)
router.delete('/:id',async (request,response)=>
{

    try{
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message:"Book is not found"});
        }
        else 
        {
            return response.status(200).send({message:'Book deleted successfully'});
        }

    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message})
    }
})

export default router;