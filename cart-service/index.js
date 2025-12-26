const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient("mongodb://mongo:27017");

app.post("/cart/add", async (req, res) => {
  await client.connect();
  const db = client.db("cloudtopg");
  await db.collection("cart").insertOne(req.body);
  res.send({ message: "Item added to cart" });
});

app.get("/cart", async (req, res) => {
  await client.connect();
  const db = client.db("cloudtopg");
  const items = await db.collection("cart").find().toArray();
  res.send(items);
});

app.delete("/cart/:id", async (req, res) => {
  await client.connect();
  const db = client.db("cloudtopg");

  await db.collection("cart").deleteOne({
    _id: new ObjectId(req.params.id)
  });

  res.send({ message: "Item removed from cart" });
});

app.listen(5001, () =>
  console.log("Cart service running on port 5001")
);