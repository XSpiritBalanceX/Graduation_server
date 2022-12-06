const {Router}=require('express');
const router=new Router();
const movieRouter=require('./movies');
const seriesRouter=require('./series');
const bookRouter=require('./books');
const gameRouter=require('./games');
const authRouter=require('./auth');


router.use('/movies', movieRouter);
router.use('/series', seriesRouter);
router.use('/books', bookRouter);
router.use('/games', gameRouter);
router.use('/user', authRouter)

module.exports=router;