const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient("mongodb://mongo:27017");

app.post("/order/checkout", async (req, res) => {
  await client.connect();
  const db = client.db("cloudtopg");

  // 1. Fetch cart items
  const cartItems = await db.collection("cart").find().toArray();

  if (cartItems.length === 0) {
    return res.status(400).send({ message: "Cart is empty" });
  }

  // 2. Calculate total
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  // 3. Create order
  const order = {
    items: cartItems,
    total,
    createdAt: new Date(),
    status: "completed"
  };

  await db.collection("orders").insertOne(order);

  // 4. Clear cart
  await db.collection("cart").deleteMany({});

  res.send({
    message: "Order placed successfully",
    total
  });
});

app.get("/orders", async (req, res) => {
  await client.connect();
  const db = client.db("cloudtopg");
  const orders = await db.collection("orders").find().toArray();
  res.send(orders);
});

app.listen(5002, () =>
  console.log("Order service running on port 5002")
);
