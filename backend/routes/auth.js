//import packages
const express = require("express");
const router = express.Router();

//importing controllers
const { login, signup, activateAccount } = require("../controllers/auth");

//importingmiddlewares
const {} = require("../midddlewares/general");

router.post("/login", login);
router.post("/signup", signup);
router.get("/activate-account/:token", activateAccount);
module.exports = router;
