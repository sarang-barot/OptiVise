const express = require("express");

const app = express();

app.use(express.json());

/* Import all required routes */
const authRouter = require("./routes/auth.routes");

/* Config the routes */
app.use("/api/auth".authRouter);

module.exports = app;
