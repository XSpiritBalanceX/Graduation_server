const {MyReview}=require('../dataBase/descriptionDB');
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
            await MyReview.create({name,rate,useremail,date:today,text,"createdAt":new Date(), "updatedAt":new Date(),title, groupn, teg, namepict:urlPict});
                      
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
            let test=[]
            name=name.split(',')
            await listAll(listRef)
            .then((pics)=>{
                productPicture=pics.items.map((item)=>{
                    const publicUrl=`https://firebasestorage.googleapis.com/v0/b/${item._location.bucket}/o/${item._location.path_}?alt=media`;  
                       return{                        
                        url:publicUrl,
                        name:item._location.path_,
                    } 
                })
                //res.send(productPicture)
            })
            .catch(err=>console.log(err.message))
            productPicture.forEach(el=>{
                if(name.includes(el.name)){
                    test.push(el.url)
                }
            })
            let t=await MyReview.findAll({where:{name}})
            res.json({test, t})
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    } 
      
}

module.exports=new ReviewController();