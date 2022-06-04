const { register } = require('../controllers/userCtrl');
const stdCtrl = require('../controllers/studentContral');
const auth = require('../middleware/auth')
const router = require('express').Router();


router.post('/stdreg',stdCtrl.register);
router.post('/active',stdCtrl.activemail);
router.post('/login',stdCtrl.login);
router.get('/info',auth,stdCtrl.getuserinfo);
router.post('/access',stdCtrl.getAccessToken);
router.get('/all',stdCtrl.getAllSTD);
router.patch('/update',stdCtrl.updateSTD);

module.exports=router;