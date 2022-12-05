const {MyGame}=require('../dataBase/descriptionDB');
const ApiError=require('../error/ApiError');

class GameController{
    async getAllGames(req, res, next){
        try{
            let {lang}=req.query;
            let allGames;
            if(lang==='ru-RU'){
                allGames=await MyGame.findAll({attributes:['id', 'nameru', 'data', 'genreru', 'developer', 'summaryru','rate', 'url']});
            }else{
                allGames=await MyGame.findAll({attributes:['id', 'nameen', 'data', 'genreen', 'developer', 'summaryen','rate', 'url']}); 
            }            
            return res.json(allGames);
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    }

    async getOneGame(req, res, next){
        try{
            let {lang,id}=req.query;
            let oneGame;
            if(lang==='ru-RU'){
                oneGame=await MyGame.findAll({where:{id},attributes:['id', 'nameru', 'data', 'genreru', 'developer', 'summaryru','rate', 'url']});
            }else{
                oneGame=await MyGame.findAll({where:{id},attributes:['id', 'nameen', 'data', 'genreen', 'developer', 'summaryen','rate', 'url']}); 
            }  
                     
            return res.json(oneGame);
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    }
}

module.exports=new GameController();