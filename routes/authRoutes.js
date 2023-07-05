const {Router} = require ('express');
const router = Router();
const authControllers = require ('../controllers/authControllers')

router.get ('/login' , authControllers.login_get);
router.post ('/login' , authControllers.login_post);
router.get ('/register' , authControllers.register_get);
router.post ('/register' , authControllers.register_post);

module.exports = router ;