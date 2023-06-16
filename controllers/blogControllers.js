const Blog = require ('../models/blogModels');
// blog

module.exports.all_blog_get = (async (req , res) =>{
    try{
        const blogs = await Blog.find();
        res.render ('home' , {blogs});
    }
    catch (err){
        console.log ('cannot get blogs' + err);
    }
})

module.exports.create_blog_get = (req , res) =>{
    res.render ('create');
} ;

module.exports.create_blog_post = ( async (req , res) =>{
    const {title , description} = req.body;
    const image = req.file.filename;
    console.log (req.file);
    console.log (req.body);

    try{
        const newBlog = await Blog.create ({title , description , image});
        res.status(200).json({newBlog});
    }
    catch (err){
        console.log('Cannot create a blog:', err);
        res.status(500).json({ error: 'Failed to create a blog' });
    }   
});
