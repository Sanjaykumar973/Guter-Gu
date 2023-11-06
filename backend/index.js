//Importing packeges
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

//import Routes
const authRoutes = require("./routes/auth");
const friendsRoutes = require("./routes/friends");
const messagesRoutes = require("./routes/messages");

//setup app
const app = express();

//Using middlewares
app.use(express.json());
app.use(cors());

// configuring database
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6"
  )
  .then(() => console.log("Database Connected"))
  .catch((err) =>
    console.log("Error Occured while Connecting Database" + err.message)
  );

//adding server check route
app.get("/", (req, res) =>
  res.json({ success: true, message: "Server is runing Fine" })
);

// ading external routes
app.use("/auth", authRoutes);
app.use("/friends", friendsRoutes);
app.use("/messages", messagesRoutes);

//Starting app
const PORT = 8000;
app.listen(PORT, () => console.log(`server is runing on PORT: ${PORT}`));
