const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviews");

/*  #swagger.tags = ['Reviews']
    #swagger.summary = 'Get all reviews'
*/
router.get("/", reviewsController.getAllReviews);

/*  #swagger.tags = ['Reviews']
    #swagger.summary = 'Get one review by id'
*/
router.get("/:id", reviewsController.getSingleReview);

/*  #swagger.tags = ['Reviews']
    #swagger.summary = 'Create a review'
*/
router.post("/", reviewsController.createReview);

/*  #swagger.tags = ['Reviews']
    #swagger.summary = 'Update a review'
*/
router.put("/:id", reviewsController.updateReview);

/*  #swagger.tags = ['Reviews']
    #swagger.summary = 'Delete a review'
*/
router.delete("/:id", reviewsController.deleteReview);

module.exports = router;