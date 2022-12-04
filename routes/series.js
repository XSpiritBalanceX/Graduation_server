const {Router}=require('express');
const seriesRouter=new Router();
const seriesController=require('../controllers/seriesController');

seriesRouter.get('/', seriesController.getAllSeries);


module.exports=seriesRouter;