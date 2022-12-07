const {Router}=require('express');
const reviewRouter=new Router();
const reviewController=require('../controllers/reviewController');

reviewRouter.get('/userreview', reviewController.getUserReview);


module.exports=reviewRouter;