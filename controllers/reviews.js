const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");

const validateReview = ({
  productId,
  reviewerName,
  title,
  rating,
  comment,
  status,
  createdAt
}) => {
  if (
    !productId || !productId.trim() ||
    !reviewerName || !reviewerName.trim() ||
    !title || !title.trim() ||
    rating === undefined || rating === null || isNaN(rating) ||
    !comment || !comment.trim() ||
    !status || !status.trim() ||
    !createdAt || !createdAt.trim()
  ) {
    return "All fields are required: productId, reviewerName, title, rating, comment, status, createdAt";
  }

  return null;
};

const getAllReviews = async (req, res) => {
  try {
    const db = getDb();
    const reviews = await db.collection("reviews").find().toArray();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleReview = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid review id" });
    }

    const db = getDb();
    const id = new ObjectId(req.params.id);
    const review = await db.collection("reviews").findOne({ _id: id });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const { productId, reviewerName, title, rating, comment, status, createdAt } = req.body;

    const validationError = validateReview({
      productId,
      reviewerName,
      title,
      rating,
      comment,
      status,
      createdAt
    });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const db = getDb();
    const result = await db.collection("reviews").insertOne({
      productId: productId.trim(),
      reviewerName: reviewerName.trim(),
      title: title.trim(),
      rating: Number(rating),
      comment: comment.trim(),
      status: status.trim(),
      createdAt: createdAt.trim()
    });

    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid review id" });
    }

    const { productId, reviewerName, title, rating, comment, status, createdAt } = req.body;

    const validationError = validateReview({
      productId,
      reviewerName,
      title,
      rating,
      comment,
      status,
      createdAt
    });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const db = getDb();
    const id = new ObjectId(req.params.id);

    const result = await db.collection("reviews").replaceOne(
      { _id: id },
      {
        productId: productId.trim(),
        reviewerName: reviewerName.trim(),
        title: title.trim(),
        rating: Number(rating),
        comment: comment.trim(),
        status: status.trim(),
        createdAt: createdAt.trim()
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid review id" });
    }

    const db = getDb();
    const id = new ObjectId(req.params.id);

    const result = await db.collection("reviews").deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview
};