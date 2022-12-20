const {MyUsers}=require('../dataBase/descriptionDB');
const ApiError=require('../error/ApiError');
const jwt=require('jsonwebtoken');

const generateJwt=(id,email,name, role)=>{
    return jwt.sign({id,email,name, role}, process.env.SECRET_KEY, {expiresIn:'24h'});
}

class AdminController{
    async getAllUsers (req, res, next){
        try{ 
           const allUsers=await MyUsers.findAll();
           return res.json(allUsers);
       }catch(e){
         return next(ApiError.internal('Something went wrong, please try again'));
       }  
   }
   async blockUser (req, res, next){
     try{ 
       let newBlock;
       let {id, block}=req.query;
       const user=await MyUsers.findOne({where:{id}});
       if(block==='true'){
        newBlock=false;
       }else if(block==='false'){
        newBlock=true;
       }
       user.blocked=newBlock;
       await user.save(); 
       let allUsers=await MyUsers.findAll();
       return res.json(allUsers);
     }catch(e){
      return next(ApiError.internal('Something went wrong, please try again'));
     }  
    }
    async giveAdmin (req, res, next){
        try{ 
            let setNewRole;
            let {id, newrole}=req.query;
            const user=await MyUsers.findOne({where:{id}});
            if(newrole==='ADMIN'){
                setNewRole='USER';  
            }else if(newrole==='USER'){
                setNewRole='ADMIN'; 
            }
            user.role=setNewRole; 
            await user.save();
            const allUsers=await MyUsers.findAll();
            return res.json(allUsers);
       }catch(e){
         return next(ApiError.internal('Something went wrong, please try again'));
       }  
   }
   async showUserPage (req, res, next){
    try{ 
        let {id,email}=req.query;
        const user=await MyUsers.findOne({where:{id}});
        const token=generateJwt(user.id,user.email, user.name,user.role);
        return res.json({email:user.email, name:user.name, token});
   }catch(e){
     return next(ApiError.internal('Something went wrong, please try again'));
   }  
}
}

module.exports = new AdminController();