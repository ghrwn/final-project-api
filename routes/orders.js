const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders");

/*  #swagger.tags = ['Orders']
    #swagger.summary = 'Get all orders'
    #swagger.description = 'Returns all orders from MongoDB'
*/
router.get("/", ordersController.getAllOrders);

/*  #swagger.tags = ['Orders']
    #swagger.summary = 'Get one order by id'
    #swagger.description = 'Returns a single order by MongoDB ObjectId'
*/
router.get("/:id", ordersController.getSingleOrder);

/*  #swagger.tags = ['Orders']
    #swagger.summary = 'Create a new order'
    #swagger.description = 'Creates a new order. All fields are required.'
*/
router.post("/", ordersController.createOrder);

/*  #swagger.tags = ['Orders']
    #swagger.summary = 'Update an order'
    #swagger.description = 'Updates an order by id. All fields are required.'
*/
router.put("/:id", ordersController.updateOrder);

/*  #swagger.tags = ['Orders']
    #swagger.summary = 'Delete an order'
    #swagger.description = 'Deletes an order by id'
*/
router.delete("/:id", ordersController.deleteOrder);

module.exports = router;