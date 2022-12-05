const {MySeries}=require('../dataBase/descriptionDB');
const ApiError=require('../error/ApiError');

class SeriesController{
    async getAllSeries(req, res, next){
        try{
            let {lang}=req.query;
            let allSeries;
            if(lang==='ru-RU'){
                allSeries=await MySeries.findAll({attributes:['id', 'nameru', 'data', 'genreru', 'starringru', 'summaryru','numberofseas', 'directorru','rate', 'metascore', 'url']});
            }else{
                allSeries=await MySeries.findAll({attributes:['id', 'nameen', 'data', 'genreen', 'starringen', 'summaryen','numberofseas', 'directoren','rate', 'metascore', 'url']}); 
            }            
            return res.json(allSeries);
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    }

    async getOneSeries(req, res, next){
        try{
            let {lang,id}=req.query;
            let oneSeries;
            if(lang==='ru-RU'){
                oneSeries=await MySeries.findAll({where:{id},attributes:['id', 'nameru', 'data', 'genreru', 'starringru', 'summaryru','numberofseas', 'directorru','rate', 'metascore', 'url']});
            }else{
                oneSeries=await MySeries.findAll({where:{id},attributes:['id', 'nameen', 'data', 'genreen', 'starringen', 'summaryen','numberofseas', 'directoren','rate', 'metascore', 'url']}); 
            }  
                     
            return res.json(oneSeries);
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    }
}

module.exports=new SeriesController();