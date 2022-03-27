const fs = require('fs');
const path = require('path');

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const router = express.Router();

const app = express();
let routeErr = false;

// middleware
app.use(cookieParser());
app.use(express.json()); // this is a alternate of bodyparser

//routing
fs.readdirSync(path.normalize('./routes')).every(file => {
    try {
        const routeName = file.includes(".route.js") ? file.split(".route.js").join() : "";
        if (routeName) {
            router.use(`${routeName}`, require(`./routes/${file}`))
        } else {
            throw new Error(`Extension of ${file} routes file should be '.route.js'`);
        }
    } catch (error) {
        routeErr = true;
        console.log("Server routing error:- ", error)
        return false
    }
});

// database connection
if (!routeErr) {
    const dbURI =
        "mongodb://localhost:27017/trade_management";
    mongoose
        .connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then((result) => {
            console.log("MongoDB connect at 3100")
            app.listen(3100);
        })
        .catch((err) => console.log(err));
}

