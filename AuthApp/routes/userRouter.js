const router = require('express').Router();

//Import Controller
const {signUp , logIn} = require('../controllers/auth');
const {auth , isAdmin , isStudent , isVisitor} = require('../middlewares/Auth');

//Create Route
router.post('/signup',signUp);
router.post('/login',logIn);

//Protected Routes
router.get('/test',auth,(req,res) => { //  Only for Testing
    res.status(200).json({
        success : true,
        message : 'This route is Only for Testing'
    })
})

router.get('/admin',auth,isAdmin , (req,res) => {
    res.status(200).json({
        success : true,
        message : 'Welcome to Admin Route'
    })
})

router.get('/student',auth,isStudent,(req,res) => {
    res.status(200).json({
        success : true,
        message : 'Welcome to Student Route'
    })
})

router.get('/visitor',auth,isVisitor,(req,res) => {
    res.status(200).json({
        success : true,
        message : 'Welcome to Visitor Route'
    })
})

module.exports = router;