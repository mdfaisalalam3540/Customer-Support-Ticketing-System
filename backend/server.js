require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/tickets", require("./routes/tickets"));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});