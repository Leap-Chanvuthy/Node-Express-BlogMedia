const express = require ('express');
const {Route, Router} = require ('express');
const router = Router();
const multerMiddleware = require ('../middleware/multer')
const {requireAuth} = require('../middleware/authMiddleware')
const blogControllers = require('../controllers/blogControllers');

router.get ('/create-blog' , requireAuth ,blogControllers.create_blog_get);
router.get ('/', requireAuth ,blogControllers.all_blog_get);
router.post ('/create-blog', requireAuth , multerMiddleware.upload.single('image') , blogControllers.create_blog_post);


// action routes
router.get ('/blog/details/:id', requireAuth , blogControllers.blog_id_get);
router.delete ('/blog/details/:id',requireAuth , blogControllers.blog_id_delete);
router.get('/blog/edit/:id' , requireAuth, blogControllers.blog_id_update_get);
router.put ('/blog/edit/:id' , requireAuth , blogControllers.blog_id_update);

module.exports = router ;