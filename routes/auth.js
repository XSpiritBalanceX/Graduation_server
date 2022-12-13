const {Router}=require('express');
const authRouter=new Router();
const authController=require('../controllers/authController');
const authMiddleware=require('../middleware/authMiddleware');

authRouter.post('/registration', authController.registration);
authRouter.post('/login', authController.login);
authRouter.get('/auth',authMiddleware, authController.check );

module.exports=authRouter;