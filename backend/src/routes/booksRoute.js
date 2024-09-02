import express from  "express";
import { addBook, deleteBook, getAllBooks , updateBook} from "../controllers/bookController.js";
import upload from "../middlewares/multer.js";



const bookRouter =  express.Router();


bookRouter.post("/add" , upload.single("image") , addBook);
bookRouter.put('/:bookId', upload.single('image'), updateBook);
bookRouter.delete('/:bookId', deleteBook);


bookRouter.get("/list" , getAllBooks);





export default bookRouter;