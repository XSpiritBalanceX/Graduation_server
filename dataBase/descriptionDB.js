const sequelize=require('./db');
const {DataTypes}=require('sequelize');

const MyMovies=sequelize.define('MyMovies',{
    id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    nameen:{type:DataTypes.STRING, unique:true},
    nameru:{type:DataTypes.STRING, unique:true},
    data:{type:DataTypes.STRING},
    genreen:{type:DataTypes.STRING},
    genreru:{type:DataTypes.STRING},
    starringen:{type:DataTypes.STRING},
    starringru:{type:DataTypes.STRING},
    directoren:{type:DataTypes.STRING},
    directorru:{type:DataTypes.STRING},
    runtime:{type:DataTypes.STRING},
    metascore:{type:DataTypes.STRING},
    summaryen:{type:DataTypes.TEXT},
    summaryru:{type:DataTypes.TEXT},
    rate:{type:DataTypes.DOUBLE},
    url:{type:DataTypes.TEXT}
});

const MySeries=sequelize.define('MySeries',{
    id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    nameen:{type:DataTypes.STRING, unique:true},
    nameru:{type:DataTypes.STRING, unique:true},
    data:{type:DataTypes.STRING},
    genreen:{type:DataTypes.STRING},
    genreru:{type:DataTypes.STRING},
    starringen:{type:DataTypes.STRING},
    starringru:{type:DataTypes.STRING},
    directoren:{type:DataTypes.STRING},
    directorru:{type:DataTypes.STRING},
    numberofseas:{type:DataTypes.STRING},
    metascore:{type:DataTypes.STRING},
    summaryen:{type:DataTypes.TEXT},
    summaryru:{type:DataTypes.TEXT},
    rate:{type:DataTypes.DOUBLE},
    url:{type:DataTypes.TEXT}
});

const MyGame=sequelize.define('MyGames',{
    id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    nameen:{type:DataTypes.STRING, unique:true},
    nameru:{type:DataTypes.STRING, unique:true},
    genreen:{type:DataTypes.STRING},
    genreru:{type:DataTypes.STRING},
    data:{type:DataTypes.STRING},
    developer:{type:DataTypes.STRING},
    summaryen:{type:DataTypes.TEXT},
    summaryru:{type:DataTypes.TEXT},
    rate:{type:DataTypes.DOUBLE},
    url:{type:DataTypes.TEXT}
});

const MyBooks=sequelize.define('MyBooks',{
    id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    nameen:{type:DataTypes.STRING, unique:true},
    nameru:{type:DataTypes.STRING, unique:true},
    genreen:{type:DataTypes.STRING},
    genreru:{type:DataTypes.STRING},
    data:{type:DataTypes.STRING},
    autoren: {type:DataTypes.STRING},
    autorru:{type:DataTypes.STRING},
    summaryen:{type:DataTypes.TEXT},
    summaryru:{type:DataTypes.TEXT},
    rate:{type:DataTypes.DOUBLE},
    url:{type:DataTypes.TEXT}
});

const MyUsers=sequelize.define('MyUsers',{
    id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    name:{type:DataTypes.STRING, unique:true},
    email:{type:DataTypes.STRING},
    password:{type:DataTypes.STRING},
    role:{type:DataTypes.STRING}
});

const MyComments=sequelize.define('MyComments', {
    id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    name:{type:DataTypes.STRING},
    user:{type:DataTypes.STRING},
    date:{type:DataTypes.STRING},
    text:{type:DataTypes.TEXT},
})

module.exports={MyMovies, MySeries, MyGame, MyBooks,MyUsers, MyComments};