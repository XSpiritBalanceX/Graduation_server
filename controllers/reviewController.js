const {MyReview}=require('../dataBase/descriptionDB');
const ApiError = require('../error/ApiError');

class ReviewController{
    async getUserReview(req, res, next){
        try{
            let {useremail}=req.query;
            let userReview=await MyReview.findAll({where:{useremail}});
                      
            return res.json(userReview);
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    }

    
}

module.exports=new ReviewController();