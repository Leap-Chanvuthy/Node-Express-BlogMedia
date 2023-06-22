const express = require ('express');
const {Route, Router} = require ('express');
const router = Router();
const multerMiddleware = require ('../middleware/multer')
const blogControllers = require('../controllers/blogControllers');

router.get ('/create-blog' , blogControllers.create_blog_get);
router.get ('/' , blogControllers.all_blog_get);
router.post ('/create-blog' , multerMiddleware.upload.single('image') , blogControllers.create_blog_post);


// action routes
router.get ('/details/:id' , blogControllers.blog_id_get);
router.delete ('/details/:id' , blogControllers.blog_id_delete);
router.put ('/details/:id' , blogControllers.blog_id_update);

module.exports = router ;