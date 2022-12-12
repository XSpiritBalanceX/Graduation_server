require('dotenv').config()
const express=require('express')
const sequelize=require('./dataBase/db')
const cors=require('cors')
const router=require('./routes/index')
const PORT=5000 ||process.env.PORT
const errorHandler=require('./middleware/ErrorHandlingMiddleware')
const passport=require('passport')
const session=require('express-session')
require('./passportGoogle');

const app=express()
app.use(cors({
    credentials:true,
    origin:'*'
}))
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)
app.use(session({
    secret:'mysecret',
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())

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