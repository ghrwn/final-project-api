const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");

const validateOrder = ({
  productId,
  quantity,
  totalPrice,
  customerName,
  status,
  orderDate,
  shippingAddress
}) => {
  if (
    !productId || !productId.trim() ||
    quantity === undefined || quantity === null || isNaN(quantity) ||
    totalPrice === undefined || totalPrice === null || isNaN(totalPrice) ||
    !customerName || !customerName.trim() ||
    !status || !status.trim() ||
    !orderDate || !orderDate.trim() ||
    !shippingAddress || !shippingAddress.trim()
  ) {
    return "All fields are required: productId, quantity, totalPrice, customerName, status, orderDate, shippingAddress";
  }

  return null;
};

const getAllOrders = async (req, res) => {
  try {
    const db = getDb();
    const orders = await db.collection("orders").find().toArray();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleOrder = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    const db = getDb();
    const id = new ObjectId(req.params.id);
    const order = await db.collection("orders").findOne({ _id: id });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const {
      productId,
      quantity,
      totalPrice,
      customerName,
      status,
      orderDate,
      shippingAddress
    } = req.body;

    const validationError = validateOrder({
      productId,
      quantity,
      totalPrice,
      customerName,
      status,
      orderDate,
      shippingAddress
    });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const db = getDb();
    const result = await db.collection("orders").insertOne({
      productId: productId.trim(),
      quantity: Number(quantity),
      totalPrice: Number(totalPrice),
      customerName: customerName.trim(),
      status: status.trim(),
      orderDate: orderDate.trim(),
      shippingAddress: shippingAddress.trim()
    });

    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    const {
      productId,
      quantity,
      totalPrice,
      customerName,
      status,
      orderDate,
      shippingAddress
    } = req.body;

    const validationError = validateOrder({
      productId,
      quantity,
      totalPrice,
      customerName,
      status,
      orderDate,
      shippingAddress
    });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const db = getDb();
    const id = new ObjectId(req.params.id);

    const result = await db.collection("orders").replaceOne(
      { _id: id },
      {
        productId: productId.trim(),
        quantity: Number(quantity),
        totalPrice: Number(totalPrice),
        customerName: customerName.trim(),
        status: status.trim(),
        orderDate: orderDate.trim(),
        shippingAddress: shippingAddress.trim()
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    const db = getDb();
    const id = new ObjectId(req.params.id);

    const result = await db.collection("orders").deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder
};