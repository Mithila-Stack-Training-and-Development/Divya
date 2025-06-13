const express = require("express");
const {handleGetAllUsers,
     handleGetUserById, 
     handleUpdateUserById,
     handleDeleteUserById,
     handleCreateNewUser} 
     = require('../controllers/user.controller.js');
const router = express.Router();


router.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewUser);

// router.get("/", handleGetAllUsers);

router.route("/:id")
.get(handleGetUserById)
 .patch(handleUpdateUserById)
 .delete(handleDeleteUserById);

// router.post("/", handleCreateNewUser);

module.exports = router;
