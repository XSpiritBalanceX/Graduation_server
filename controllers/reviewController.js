const {MyReview}=require('../dataBase/descriptionDB');
const {MyUsers}=require('../dataBase/descriptionDB');
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
            let userName=await MyUsers.findOne({where:{email:useremail}, attributes:['name']}) 
            await MyReview.create({name,rate,useremail,date:today,text,"createdAt":new Date(), "updatedAt":new Date(),title, groupn, teg, namepict:urlPict, nameuser:userName});
                      
            return res.json({message:'You have successfully written your review'});
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