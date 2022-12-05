const {Router}=require('express');
const movieRouter=new Router();
const movieController=require('../controllers/movieController');

movieRouter.get('/', movieController.getAllMovies);
movieRouter.get('/getonemovie', movieController.getOneMovies)


module.exports=movieRouter;