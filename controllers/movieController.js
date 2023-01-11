const {MyMovies}=require('../dataBase/descriptionDB');
const ApiError = require('../error/ApiError');

class MovieController{
    async getAllMovies(req, res, next){
        try{
            let allMovies=await MyMovies.findAll({attributes:['id', 'name', 'data', 'genre', 'starring', 'summary','runtime', 'director','rate', 'metascore', 'url']});
                        
            return res.json(allMovies);
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    }

    async getOneMovies(req, res, next){
        try{
            let {id}=req.query;
            let oneMovie=await MyMovies.findAll({where:{id},attributes:['id', 'name', 'data', 'genre', 'starring', 'summary','runtime', 'director','rate', 'metascore', 'url']});
                    
            return res.json(oneMovie);
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    }
    
}

module.exports=new MovieController();