const {MyGame}=require('../dataBase/descriptionDB');
const ApiError=require('../error/ApiError');

class GameController{
    async getAllGames(req, res, next){
        try{
            let allGames=await MyGame.findAll({attributes:['id', 'name', 'data', 'genre', 'developer', 'summary','rate', 'url']});
                        
            return res.json(allGames);
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    }

    async getOneGame(req, res, next){
        try{
            let {id}=req.query;
            let oneGame=await MyGame.findAll({where:{id},attributes:['id', 'name', 'data', 'genre', 'developer', 'summary','rate', 'url']});
                    
            return res.json(oneGame);
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    }
}

module.exports=new GameController();