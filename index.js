// // import express from "express";
// // import cors from "cors";
// // import cookieParser from "cookie-parser";
// // import mongoose from "mongoose";
// const express = require("express");
// const cors = require("cors");
// // const cookieParser = require("cookie-parser");
// const mongoose = require("mongoose");
// const app = express();

// const port = 5000;

// app.use(cors());
// // app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// const uri =
//   "mongodb+srv://news-portal-user:0w6awLBAWUvAXv00@cluster0.s5oej.mongodb.net/?retryWrites=true&w=majority";

// async function bootstrap() {
//   try {
//     await mongoose.connect(uri);
//     app.listen(port, () => {
//       console.log(`Application app listening on port ${port}`);
//     });
//     console.log("database connected");

//     app.get("/homeFeaturedProduct", (req, res) => {
//         res.send("Hello World!");
//       });
//   } catch (error) {
//     console.log("database fail to connect", error);
//   }
// }

// bootstrap();

// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const { MongoClient, ObjectId } = require("mongodb");

// const app = express();
// const PORT = 5000; // You can use any port number you prefer

// // Enable cross-origin resource sharing
// app.use(cors());

// // Parse incoming requests with JSON payloads
// app.use(bodyParser.json());

// // Connect to MongoDB
// const mongoURL =
//   "mongodb+srv://university-admin:5hVFTDbBVoViC4K5@cluster0.s5oej.mongodb.net/?retryWrites=true&w=majority";
// const dbName = "news-portal"; // Replace 'mydatabase' with your database name

// let db;

// MongoClient.connect(mongoURL, { useUnifiedTopology: true }, (err, client) => {
//   if (err) {
//     console.error("Error connecting to MongoDB:", err);
//     process.exit(1);
//   }
//   console.log("Connected to MongoDB successfully!");
//   db = client.db(dbName);

//   // Define your routes and endpoints here

//   // Create a new user
//   app.post("/users", async (req, res) => {
//     try {
//       const { name, email, age } = req.body;
//       const result = await db
//         .collection("users")
//         .insertOne({ name, email, age });
//       res.status(201).json(result.ops[0]);
//     } catch (error) {
//       console.error("Error creating user:", error);
//       res.status(500).json({ error: "Could not create user." });
//     }
//   });

//   // Get all users
//   app.get("/users", async (req, res) => {
//     try {
//       const users = await db.collection("users").find().toArray();
//       res.json(users);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       res.status(500).json({ error: "Could not fetch users." });
//     }
//   });

//   // Get a user by ID
//   app.get("/users/:id", async (req, res) => {
//     try {
//       const userId = req.params.id;
//       const user = await db
//         .collection("users")
//         .findOne({ _id: ObjectId(userId) });
//       if (!user) {
//         res.status(404).json({ error: "User not found." });
//       } else {
//         res.json(user);
//       }
//     } catch (error) {
//       console.error("Error fetching user:", error);
//       res.status(500).json({ error: "Could not fetch user." });
//     }
//   });

//   // Update a user by ID
//   app.put("/users/:id", async (req, res) => {
//     try {
//       const userId = req.params.id;
//       const { name, email, age } = req.body;
//       const result = await db
//         .collection("users")
//         .findOneAndUpdate(
//           { _id: ObjectId(userId) },
//           { $set: { name, email, age } },
//           { returnOriginal: false }
//         );
//       if (!result.value) {
//         res.status(404).json({ error: "User not found." });
//       } else {
//         res.json(result.value);
//       }
//     } catch (error) {
//       console.error("Error updating user:", error);
//       res.status(500).json({ error: "Could not update user." });
//     }
//   });

//   // Delete a user by ID
//   app.delete("/users/:id", async (req, res) => {
//     try {
//       const userId = req.params.id;
//       const result = await db
//         .collection("users")
//         .deleteOne({ _id: ObjectId(userId) });
//       if (result.deletedCount === 0) {
//         res.status(404).json({ error: "User not found." });
//       } else {
//         res.json({ message: "User deleted successfully." });
//       }
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       res.status(500).json({ error: "Could not delete user." });
//     }
//   });

//   // Start the server
//   app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//   });
// });

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
