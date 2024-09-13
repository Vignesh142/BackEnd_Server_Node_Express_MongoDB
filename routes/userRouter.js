const express= require("express");
const { registerUser, currUser, loginUser } = require("../controllers/userController");
const validateToken = require("../middlewares/validateTokenHandler");
 
const router= express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/current", validateToken, currUser);

module.exports = router;