const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");

/*  #swagger.tags = ['Products']
    #swagger.summary = 'Get all products'
    #swagger.description = 'Returns all products from MongoDB'
*/
router.get("/", productsController.getAllProducts);

/*  #swagger.tags = ['Products']
    #swagger.summary = 'Get one product by id'
    #swagger.description = 'Returns a single product by MongoDB ObjectId'
*/
router.get("/:id", productsController.getSingleProduct);

/*  #swagger.tags = ['Products']
    #swagger.summary = 'Create a new product'
    #swagger.description = 'Creates a new product. All fields are required.'
*/
router.post("/", productsController.createProduct);

/*  #swagger.tags = ['Products']
    #swagger.summary = 'Update a product'
    #swagger.description = 'Updates a product by id. All fields are required.'
*/
router.put("/:id", productsController.updateProduct);

/*  #swagger.tags = ['Products']
    #swagger.summary = 'Delete a product'
    #swagger.description = 'Deletes a product by id'
*/
router.delete("/:id", productsController.deleteProduct);

module.exports = router;