require("dotenv/config");
const express = require("express")
const mongoose = require('mongoose');

const app = express()

//middlewares
const authMiddleware = require("./middlewares/authMiddleware");

//routes
const authRoute = require("./routes/authRoute")
const homeRoute = require("./routes/homeRoute")
const {Roles} = require("./constants/Roles");
const cors = require("cors");

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({origin: "*"}));
app.use("/api/auth", authRoute);
app.use("/api/", authMiddleware(Roles.USER), homeRoute);


async function bootstrap() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
        console.log("Connected to MongoDB");

        app.listen(8080, () => {
            console.log("Server started on port 8080 !")
        })
    } catch (err) {
        console.log(err);
    }
}

bootstrap()
    .then(() => {
    });
