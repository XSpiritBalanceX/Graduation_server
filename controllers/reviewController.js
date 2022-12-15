const {MyReview, MyUsers, MyComments, MyRating}=require('../dataBase/descriptionDB');
const ApiError = require('../error/ApiError');
const {ref,uploadBytes, listAll}=require('firebase/storage')
const storage=require('../firebase')


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

    async getItemReview(req, res, next){
        try{
            let {name}=req.query;
            let itemReview=await MyReview.findAll({where:{name}});    
            return res.json(itemReview);
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    }

    async getOneReview(req, res, next){
        try{
            let {id}=req.query;
            let oneReview=await MyReview.findAll({where:{id}}); 
            /* let test=await MyRating.findAll({where:{namereview:oneReview.dataValues.title}})
           console.log(test) */   
            return res.json(oneReview);
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    }

    async createReview(req, res, next){
        try{
            let {name,useremail, title, groupn, teg,rate, text }=req.body;
            let file=req.file;
            const imageRef=ref(storage, file.originalname);
            let urlPict=`https://firebasestorage.googleapis.com/v0/b/${imageRef._location.bucket}/o/${file.originalname}?alt=media`
            const metatype = { contentType: file.mimetype, name: file.originalname };
            await uploadBytes(imageRef, file.buffer, metatype)
            .then((snapshot)=>{
                console.log('uploaded');
            })
            .catch(err=>console.log(err.message))
            const today=new Date().toLocaleString();
            let userName=await MyUsers.findOne({where:{email:useremail}, attributes:['name']});
            await MyReview.create({name,rate,useremail,date:today,text,"createdAt":new Date(), "updatedAt":new Date(),title, groupn, teg, namepict:urlPict, nameuser:userName.dataValues.name});
                      
            return res.json({message:'You have successfully written your review'});
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    }  
    
    async createComment(req, res, next){
        try{
            let {namereview,useremail, text }=req.body;
            const today=new Date().toLocaleString();
            let userName=await MyUsers.findOne({where:{email:useremail}, attributes:['name']});
            await MyComments.create({namereview,useremail,date:today,text,"createdAt":new Date(), "updatedAt":new Date(), nameuser:userName.dataValues.name});
            return res.json({message:'Published'});
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    }  
    async getComments(req, res, next){
        try{
            /* let {namereview}=req.query;  
            console.log(req.query)        
            let comments=await MyComments.findAll({attributes:['namereview']===namereview});  */ 
            let comments=await MyComments.findAll(); 
            return res.json(comments);
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    } 
    async setRating(req, res, next){
        try{
            let {useremail, value, namereview}=req.body;
            let ratingUser=await MyRating.findOne({where:{useremail, namereview}});
             if(!ratingUser){
                await MyRating.create({namereview,useremail, value, "createdAt":new Date(), "updatedAt":new Date()})
            }
            ratingUser.value=value;
            await ratingUser.save()
            res.json({message:'OK'}) 
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    } 

    async getPicture(req, res, next){
        try{
            let {name}=req.query;
            let listRef=ref(storage);
            let productPicture=[];
            await listAll(listRef)
            .then((pics)=>{
                productPicture=pics.items.map((item)=>{
                    const publicUrl=`https://firebasestorage.googleapis.com/v0/b/${item._location.bucket}/o/${item._location.path_}?alt=media`;  
                       return{                        
                        url:publicUrl,
                        name:item._location.path_,
                    } 
                })
                res.send(productPicture)
            })
            .catch(err=>console.log(err.message))
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    } 
      
}

module.exports=new ReviewController();