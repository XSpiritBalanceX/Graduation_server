const {MyMovies}=require('../dataBase/descriptionDB');
const ApiError = require('../error/ApiError');

class MovieController{
    async getAllMovies(req, res, next){
        try{
            let {lang}=req.query;
            let allMovies;
            if(lang==='ru-RU'){
                allMovies=await MyMovies.findAll({attributes:['id', 'nameru', 'data', 'genreru', 'starringru', 'summaryru','runtime', 'directorru','rate', 'metascore', 'url']});
            }else{
               allMovies=await MyMovies.findAll({attributes:['id', 'nameen', 'data', 'genreen', 'starringen', 'summaryen','runtime', 'directoren','rate', 'metascore', 'url']}); 
            }            
            return res.json(allMovies);
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    }

    async getOneMovies(req, res, next){
        try{
            let {lang,id}=req.query;
            let oneMovie;
            if(lang==='ru-RU'){
                oneMovie=await MyMovies.findAll({where:{id},attributes:['id', 'nameru', 'data', 'genreru', 'starringru', 'summaryru','runtime', 'directorru','rate', 'metascore', 'url']});
            }else{
                oneMovie=await MyMovies.findAll({where:{id},attributes:['id', 'nameen', 'data', 'genreen', 'starringen', 'summaryen','runtime', 'directoren','rate', 'metascore', 'url']}); 
            }  
                     
            return res.json(oneMovie);
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    }
    
}

module.exports=new MovieController();