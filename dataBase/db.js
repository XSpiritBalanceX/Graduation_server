const {Sequelize}=require('sequelize');

module.exports=new Sequelize(
    'railway' ,
     'postgres' ,
     'JavwHeRSduY3stUIsLow' ,
    {
        dialect:'postgres',
        host:"containers-us-west-137.railway.app" ,
        port: 7845 
    }
)