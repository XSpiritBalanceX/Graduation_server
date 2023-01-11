const {MySeries}=require('../dataBase/descriptionDB');
const ApiError=require('../error/ApiError');

class SeriesController{
    async getAllSeries(req, res, next){
        try{
            let allSeries=await MySeries.findAll({attributes:['id', 'name', 'data', 'genre', 'starring', 'summary','numberofseas', 'director','rate', 'metascore', 'url']});
                        
            return res.json(allSeries);
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    }

    async getOneSeries(req, res, next){
        try{
            let {id}=req.query;
            let oneSeries=await MySeries.findAll({where:{id},attributes:['id', 'name', 'data', 'genre', 'starring', 'summary','numberofseas', 'director','rate', 'metascore', 'url']});
                   
            return res.json(oneSeries);
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    }
}

module.exports=new SeriesController();