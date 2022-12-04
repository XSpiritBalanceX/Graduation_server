const {MyMovies}=require('../dataBase/descriptionDB');
const ApiError = require('../error/ApiError');

class MovieController{
    async getAllMovies(req, res, next){
        try{
            let lang=req.params.ln;
            let allMovies;
            if(lang==='ru'){
                allMovies=await MyMovies.findAll({attributes:['id', 'nameru', 'data', 'genreru', 'starringru', 'summaryru','runtime', 'directorru', 'metascore']});
            }else{
               allMovies=await MyMovies.findAll({attributes:['id', 'nameen', 'data', 'genreen', 'starringen', 'summaryen','runtime', 'directoren', 'metascore']}); 
            }            
            return res.json(allMovies);
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    }
}

module.exports=new MovieController();