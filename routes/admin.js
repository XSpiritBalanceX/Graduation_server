const {Router}=require('express');
const adminRouter=new Router();
const checkRole=require('../middleware/checkRoleMiddleware');
const adminController=require('../controllers/adminController');

adminRouter.get('/',checkRole('ADMIN'), adminController.getAllUsers );
adminRouter.get('/block', adminController.blockUser );
adminRouter.get('/giveadmin', adminController.giveAdmin );
adminRouter.get('/showuser', adminController.showUserPage );

module.exports=adminRouter;