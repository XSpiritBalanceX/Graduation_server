const {Router}=require('express');
const movieRouter=new Router();
const movieController=require('../controllers/movieController');

movieRouter.get('/:ln', movieController.getAllMovies);


module.exports=movieRouter;