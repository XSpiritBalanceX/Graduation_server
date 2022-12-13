require('dotenv').config()
const express=require('express')
const sequelize=require('./dataBase/db')
const cors=require('cors')
const router=require('./routes/index')
const PORT=5000 ||process.env.PORT
const errorHandler=require('./middleware/ErrorHandlingMiddleware')
const passport=require('passport')
const passportSetup=require('./passportGoogle')
const cookieSession=require('cookie-session');
const authGoogle=require('./routes/authGoogle')

const app=express();

app.use(cookieSession({
    name:'session',
    keys:['helen'],
    maxAge:24*60*60*100
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin:'http://localhost:3000',
    methods:'GET, POST, PUT, DELETE',
    credentials:true
}));
app.use(express.json());
app.use('/api', router);
app.use('/auth', authGoogle)
app.use(errorHandler);

const start=async ()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))
    }catch(e){
        console.log(e)
    }
}

start()