const {Router}=require('express');
const bookRouter=new Router();
const booksController=require('../controllers/booksController');

bookRouter.get('/', booksController.getAllBooks);
bookRouter.get('/getonebook', booksController.getOneBook)


module.exports=bookRouter;