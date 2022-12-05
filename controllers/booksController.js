const {MyBooks}=require('../dataBase/descriptionDB');
const ApiError=require('../error/ApiError');

class BooksController{
    async getAllBooks(req, res, next){
        try{
            let {lang}=req.query;
            let allBooks;
            if(lang==='ru-RU'){
                allBooks=await MyBooks.findAll({attributes:['id', 'nameru', 'data', 'genreru', 'autorru', 'summaryru','rate', 'url']});
            }else{
                allBooks=await MyBooks.findAll({attributes:['id', 'nameen', 'data', 'genreen', 'autoren', 'summaryen','rate', 'url']}); 
            }            
            return res.json(allBooks);
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    }

    async getOneBook(req, res, next){
        try{
            let {lang,id}=req.query;
            let oneBook;
            if(lang==='ru-RU'){
                oneBook=await MyBooks.findAll({where:{id},attributes:['id', 'nameru', 'data', 'genreru', 'autorru', 'summaryru','rate', 'url']});
            }else{
                oneBook=await MyBooks.findAll({where:{id},attributes:['id', 'nameen', 'data', 'genreen', 'autoren', 'summaryen','rate', 'url']}); 
            }  
                     
            return res.json(oneBook);
        }catch(err){
            return next(ApiError.internal('Something went wrong, please try again'));
        }
    }
}

module.exports=new BooksController();