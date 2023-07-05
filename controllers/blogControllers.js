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

module.exports.blog_id_get = ( (req , res) =>{
    const id = req.params.id;
    Blog.findById(id)
        .then ((result) =>{
            res.render ('details' , {blog : result});
        })
        .catch ((err) =>{
            console.log (err);
        })
});

module.exports.blog_id_delete = (async ( req , res) => {
    try{
        const id = req.params.id;
        const deleteBlog = await Blog.findByIdAndDelete(id);
        res.status(200).json({message : 'successfully deleted a blog'});
    }
    catch (err) {
        res.status(404).json({message : 'failed to delete a blog'});
    }
});


module.exports.blog_id_update_get = ((req , res) =>{
    const id = req.params.id;
    Blog.findById(id)
    .then ((result)  =>{
        res.render ('edit' , {blog : result});
    })
    .catch ((err) =>{
        console.log ('cannot find go to edit page');
    })
})

module.exports.blog_id_update = (async (req , res) =>{
    try {
        const id = req.params.id;
        const {title , description} = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(id , {title , description} , {new : true});
        res.status(200).json({updatedBlog});

    }
    catch (err){
        res.status(404).json({message : 'failed to update a blog'});
    }
});