const {register,login, setAvatar, getAllUsers} = require("../controller/UserController")
const router = require("express").Router()
router.post('/register',register)
router.post('/login',login)
router.post('/setAvatar',setAvatar)
router.get('/getAllusers/:id',getAllUsers)
module.exports = router;
