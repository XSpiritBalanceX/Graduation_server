const sequelize=require('./db');
const {DataTypes}=require('sequelize');

const MyMovies=sequelize.define('MyMovies',{
    id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    name:{type:DataTypes.STRING, unique:true},
    data:{type:DataTypes.STRING},
    genre:{type:DataTypes.STRING},
    starring:{type:DataTypes.STRING},
    director:{type:DataTypes.STRING},
    runtime:{type:DataTypes.STRING},
    metascore:{type:DataTypes.STRING},
    summary:{type:DataTypes.TEXT},
    rate:{type:DataTypes.DOUBLE},
    url:{type:DataTypes.TEXT}
});

const MySeries=sequelize.define('MySeries',{
    id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    name:{type:DataTypes.STRING, unique:true},
    data:{type:DataTypes.STRING},
    genre:{type:DataTypes.STRING},
    starring:{type:DataTypes.STRING},
    director:{type:DataTypes.STRING},
    numberofseas:{type:DataTypes.STRING},
    metascore:{type:DataTypes.STRING},
    summary:{type:DataTypes.TEXT},
    rate:{type:DataTypes.DOUBLE},
    url:{type:DataTypes.TEXT}
});

const MyGame=sequelize.define('MyGames',{
    id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    name:{type:DataTypes.STRING, unique:true},
    genre:{type:DataTypes.STRING},
    data:{type:DataTypes.STRING},
    developer:{type:DataTypes.STRING},
    summary:{type:DataTypes.TEXT},
    rate:{type:DataTypes.DOUBLE},
    url:{type:DataTypes.TEXT}
});

const MyBooks=sequelize.define('MyBooks',{
    id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    name:{type:DataTypes.STRING, unique:true},
    genre:{type:DataTypes.STRING},
    data:{type:DataTypes.STRING},
    autor:{type:DataTypes.STRING},
    summary:{type:DataTypes.TEXT},
    rate:{type:DataTypes.DOUBLE},
    url:{type:DataTypes.TEXT}
});

const MyUsers=sequelize.define('MyUsers',{
    id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    name:{type:DataTypes.STRING, unique:true},
    email:{type:DataTypes.STRING, unique:true},
    password:{type:DataTypes.STRING},
    role:{type:DataTypes.STRING, defaultValue:"USER"},
    blocked:{type:DataTypes.BOOLEAN,defaultValue:false}
});

const MyReview=sequelize.define('MyReviews', {
    id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    name:{type:DataTypes.STRING},
    title:{type:DataTypes.STRING},
    groupn:{type:DataTypes.STRING},
    teg:{type:DataTypes.STRING},
    rate:{type:DataTypes.TEXT},
    useremail:{type:DataTypes.STRING},
    date:{type:DataTypes.STRING},
    text:{type:DataTypes.TEXT},
    namepict:{type:DataTypes.TEXT},
    nameuser:{type:DataTypes.TEXT}
})

const MyComments=sequelize.define('MyComments', {
    id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    namereview:{type:DataTypes.STRING},
    nameuser:{type:DataTypes.STRING},
    useremail:{type:DataTypes.STRING},
    date:{type:DataTypes.STRING},
    text:{type:DataTypes.TEXT},
})

const MyRating=sequelize.define('rating', {
    id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    namereview:{type:DataTypes.STRING},
    useremail:{type:DataTypes.STRING},
    value:{type:DataTypes.INTEGER, defaultValue:0},
    like:{type:DataTypes.BOOLEAN, defaultValue:false},
})
const MyTags=sequelize.define('tags', {
    id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    value:{type:DataTypes.STRING}
})

module.exports={MyMovies, MySeries, MyGame, MyBooks,MyUsers, MyComments, MyReview, MyRating, MyTags};