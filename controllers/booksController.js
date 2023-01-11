const {MyBooks}=require('../dataBase/descriptionDB');
const ApiError=require('../error/ApiError');

class BooksController{
    async getAllBooks(req, res, next){
        try{
            let allBooks=await MyBooks.findAll({attributes:['id', 'name', 'data', 'genre', 'autor', 'summary','rate', 'url']});
                       
            return res.json(allBooks);
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    }

    async getOneBook(req, res, next){
        try{
            let {id}=req.query;
            let oneBook=await MyBooks.findAll({where:{id},attributes:['id', 'name', 'data', 'genre', 'autor', 'summary','rate', 'url']});
             
                     
            return res.json(oneBook);
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    }
}

module.exports=new BooksController();