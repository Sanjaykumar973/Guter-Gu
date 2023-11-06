const express = require("express");
const router = express.Router();

//importing controllers
const { searchFriend, addFriend } = require("../controllers/friends");

//importingmiddlewares
const { isLoggedIn } = require("../midddlewares/general");

//routes

// Route to Search the Freind using email or Name
router.post("/search-friend", isLoggedIn, searchFriend);
// Route to Add the Freind
router.get("/add-friend/:friendid", isLoggedIn, addFriend);

module.exports = router;
