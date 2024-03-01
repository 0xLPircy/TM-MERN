const express = require("express"); //like import
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5001;

connectDB();

const app = express();

app.use(express.json()); //to get values from body as they are undefined warna
app.use(express.urlencoded({ extended: false })); //middleware to accept data from body
app.use("/api/goals", require("./routes/goalRoutes")); //actual routes folder
app.use("/api/users", require("./routes/userRoutes")); //actual routes folder
app.use(errorHandler); //custom error handling file

app.listen(port, () => console.log(`Server started on port ${port}`));
