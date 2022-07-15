const {register,login, setAvatar} = require("../controller/UserController")
const router = require("express").Router()
router.post('/register',register)
router.post('/login',login)
router.post('/setAvatar',setAvatar)
module.exports = router;
