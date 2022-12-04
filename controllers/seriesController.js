const {MySeries}=require('../dataBase/descriptionDB');
const ApiError=require('../error/ApiError');

class SeriesController{
    async getAllSeries(req, res, next){
        try{
            let allSeries=await MySeries.findAll({attributes:['id', 'name', 'data', 'genre','numberofseas', 'starring', 'summary', 'director', 'metascore']});
            return res.json(allSeries);
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    }
}

module.exports=new SeriesController();