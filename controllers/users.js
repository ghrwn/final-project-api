const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");

const validateUser = ({
  username,
  email,
  role,
  isActive,
  favoriteCategory,
  address,
  createdAt
}) => {
  if (
    !username || !username.trim() ||
    !email || !email.trim() ||
    !role || !role.trim() ||
    typeof isActive !== "boolean" ||
    !favoriteCategory || !favoriteCategory.trim() ||
    !address || !address.trim() ||
    !createdAt || !createdAt.trim()
  ) {
    return "All fields are required: username, email, role, isActive, favoriteCategory, address, createdAt";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  return null;
};

const getAllUsers = async (req, res) => {
  try {
    const db = getDb();
    const users = await db.collection("users").find().toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const db = getDb();
    const id = new ObjectId(req.params.id);
    const user = await db.collection("users").findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email, role, isActive, favoriteCategory, address, createdAt } = req.body;

    const validationError = validateUser({
      username,
      email,
      role,
      isActive,
      favoriteCategory,
      address,
      createdAt
    });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const db = getDb();
    const result = await db.collection("users").insertOne({
      username: username.trim(),
      email: email.trim(),
      role: role.trim(),
      isActive,
      favoriteCategory: favoriteCategory.trim(),
      address: address.trim(),
      createdAt: createdAt.trim()
    });

    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const { username, email, role, isActive, favoriteCategory, address, createdAt } = req.body;

    const validationError = validateUser({
      username,
      email,
      role,
      isActive,
      favoriteCategory,
      address,
      createdAt
    });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const db = getDb();
    const id = new ObjectId(req.params.id);

    const result = await db.collection("users").replaceOne(
      { _id: id },
      {
        username: username.trim(),
        email: email.trim(),
        role: role.trim(),
        isActive,
        favoriteCategory: favoriteCategory.trim(),
        address: address.trim(),
        createdAt: createdAt.trim()
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const db = getDb();
    const id = new ObjectId(req.params.id);

    const result = await db.collection("users").deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
};