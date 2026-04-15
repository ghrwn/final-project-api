const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

/*  #swagger.tags = ['Users']
    #swagger.summary = 'Get all users'
*/
router.get("/", usersController.getAllUsers);

/*  #swagger.tags = ['Users']
    #swagger.summary = 'Get one user by id'
*/
router.get("/:id", usersController.getSingleUser);

/*  #swagger.tags = ['Users']
    #swagger.summary = 'Create a user'
*/
router.post("/", usersController.createUser);

/*  #swagger.tags = ['Users']
    #swagger.summary = 'Update a user'
*/
router.put("/:id", usersController.updateUser);

/*  #swagger.tags = ['Users']
    #swagger.summary = 'Delete a user'
*/
router.delete("/:id", usersController.deleteUser);

module.exports = router;