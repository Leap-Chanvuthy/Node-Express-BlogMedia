const Blog = require ('../models/blogModels');

module.exports.search_blog = (async ( req , res) =>{
    try{
        const {query} = req.query;
        const blogs = Blog.find({title : {$regex : query , $options : 'i'}});
        res.status(200).json({blogs});
    }
    catch (err){
        res.status(404).json({err : 'cannot find a blog'});
    }
})