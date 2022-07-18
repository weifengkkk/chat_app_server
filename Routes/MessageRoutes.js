const { sendMessage, getMessages } = require("../controller/MessageController");
const router = require("express").Router();

router.post("/sendmsg/", sendMessage);
router.post("/getmsg/", getMessages);

module.exports = router;