const {MyUsers}=require('../dataBase/descriptionDB');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const ApiError=require('../error/ApiError');

const generateJwt=(id,email,name, role)=>{
    return jwt.sign({id,email,name, role}, process.env.SECRET_KEY, {expiresIn:'24h'});
}


class AuthController{
    async registration (req, res, next){
        try{
            const {name, email, password, role}= req.body;
            if(!name || !email || !password){
                return next(ApiError.badRequest('All data not filled'));
            }
    
            const candidate=await MyUsers.findOne({where:{email}});
            if(candidate){
                return next(ApiError.badRequest('This user already exists'));
            }
            const hashPassword= await bcrypt.hash(password, 5);
            const today=new Date().toLocaleString();
            const user=await MyUsers.create({name, email, password:hashPassword,role, data_reg:today, data_log:today, "createdAt":new Date(), "updatedAt":new Date()});
            const token=generateJwt(user.id,user.email, user.name,user.role);
           return res.json({token,message:'You have successfully registration!'});
        }catch(e){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    }

    async login (req, res, next){
        try{ 
           const {email, password}=req.body;
           const user=await MyUsers.findOne({where:{email}})
           if(!user){
             return next(ApiError.internal('User is not found'));
           }
           const today=new Date().toLocaleString();
           user.data_log=today;
           await user.save();
           let comparePassword=bcrypt.compareSync(password, user.password);
           if(!comparePassword){
               return next(ApiError.internal('Wrong password entered'));
           }
           const isBlocked=user.blocked
           const token=generateJwt(user.id,user.email, user.name,user.role)
           return res.json({token,isBlocked, email:user.email, name:user.name,message:'Successfully'})
       }catch(e){
         return next(ApiError.internal('Something went wrong, please try again'));
       }  
   }

   async check(req, res, next){
     const token=generateJwt(req.user.id, req.user.email, req.user.name,req.user.role);
     res.json({token})
   }

}

module.exports = new AuthController();