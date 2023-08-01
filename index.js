const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const PORT = 5000; // You can use any port number you prefer

// Enable cross-origin resource sharing
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

const uri =
  "mongodb+srv://news-portal-user:0w6awLBAWUvAXv00@cluster0.s5oej.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectToMongoDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    db = client.db("news-portal"); // Replace 'your_database_name' with the actual name of your database
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

connectToMongoDB();

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.get("/pcData", async (req, res) => {
  try {
    const pcData = await db.collection("pcData").find({}).toArray();
    if (!pcData) {
      res.status(404).json({ error: "data not found." });
    } else {
      res.json(pcData);
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Could not fetch pc data." });
  }
});

app.get("/filter/:category", async (req, res) => {
  try {
    const filter = req.params.category;
    const pcData = await db
      .collection("pcData")
      .find({ category: filter })
      .toArray();
    if (!pcData) {
      res.status(404).json({ error: "data not found." });
    } else {
      res.json(pcData);
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Could not fetch pc data." });
  }
});

app.get("/pcData/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const singlePcData = await db.collection("pcData").findOne({ id: userId });
    if (!singlePcData) {
      res.status(404).json({ error: "data not found." });
    } else {
      res.json(singlePcData);
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Could not fetch data." });
  }
});

// Rest of your routes and logic...

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
