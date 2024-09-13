const express = require('express');
const dotenv = require('dotenv').config();

const app = express();

const contactRouter = require("./routes/contactRouter");
const userRouter = require("./routes/userRouter");
const errorHandler = require('./middlewares/errorhandler');
const connectDB = require('./config/dbConnection');

const port= process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use("/api/contacts",contactRouter);
app.use("/api/users",userRouter);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

