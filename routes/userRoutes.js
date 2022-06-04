const router = require('express').Router()

const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const authSuper = require('../middleware/authSuper')





router.post('/register', userCtrl.register)
router.post('/activation', userCtrl.activateEmail)
router.post('/login', userCtrl.login)
router.post('/refresh_token', userCtrl.getAccessToken)
router.post('/forgot', userCtrl.fogetPassword)
router.post('/reset',auth, userCtrl.resetPassword)

router.get('/infor', auth, userCtrl.getUserInfor)

router.get('/all_infor', auth, authAdmin, userCtrl.getUserAllInfor)

router.get('/alldata', userCtrl.getUserAllData)



router.get('/logout', userCtrl.logout)

router.patch('/update', auth, userCtrl.updateUser)

router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUserRole)

router.patch('/update_panel/:id', auth, authAdmin, userCtrl.updatePanelRole)

router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser)

router.get('/supinfo', auth,authSuper, userCtrl.getSupInfo)



 





module.exports = router