const {Router}=require('express');
const gameRouter=new Router();
const gameController=require('../controllers/gamesController');

gameRouter.get('/', gameController.getAllGames);
gameRouter.get('/getonegame', gameController.getOneGame)


module.exports=gameRouter;