const {Sequelize}=require('sequelize');

module.exports=new Sequelize(
    'railway' ,
     'postgres' ,
     'pfMYfubSfOdqlXfWZAO7' ,
    {
        dialect:'postgres',
        host:"containers-us-west-137.railway.app" ,
        port: 7845 
    }
)