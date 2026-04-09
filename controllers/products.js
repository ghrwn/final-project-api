const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");

const validateProduct = ({ name, price, category, stock, brand, rating, createdAt }) => {
  if (
    !name || !name.trim() ||
    price === undefined || price === null || isNaN(price) ||
    !category || !category.trim() ||
    stock === undefined || stock === null || isNaN(stock) ||
    !brand || !brand.trim() ||
    rating === undefined || rating === null || isNaN(rating) ||
    !createdAt || !createdAt.trim()
  ) {
    return "All fields are required: name, price, category, stock, brand, rating, createdAt";
  }

  return null;
};

const getAllProducts = async (req, res) => {
  try {
    const db = getDb();
    const products = await db.collection("products").find().toArray();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const db = getDb();
    const id = new ObjectId(req.params.id);
    const product = await db.collection("products").findOne({ _id: id });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, category, stock, brand, rating, createdAt } = req.body;

    const validationError = validateProduct({
      name,
      price,
      category,
      stock,
      brand,
      rating,
      createdAt
    });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const db = getDb();
    const result = await db.collection("products").insertOne({
      name: name.trim(),
      price: Number(price),
      category: category.trim(),
      stock: Number(stock),
      brand: brand.trim(),
      rating: Number(rating),
      createdAt: createdAt.trim()
    });

    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const { name, price, category, stock, brand, rating, createdAt } = req.body;

    const validationError = validateProduct({
      name,
      price,
      category,
      stock,
      brand,
      rating,
      createdAt
    });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const db = getDb();
    const id = new ObjectId(req.params.id);

    const result = await db.collection("products").replaceOne(
      { _id: id },
      {
        name: name.trim(),
        price: Number(price),
        category: category.trim(),
        stock: Number(stock),
        brand: brand.trim(),
        rating: Number(rating),
        createdAt: createdAt.trim()
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const db = getDb();
    const id = new ObjectId(req.params.id);

    const result = await db.collection("products").deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct
};