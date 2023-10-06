const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv-safe");
const compress = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("./mongoose");

dotenv.config({
    allowEmptyValues: true,
    path: path.join(__dirname, "../../.env"),
});

const indexRouter = require("../routes/index");
const userRouter = require("../routes/user");
const authRouter = require("../routes/auth");
const shippingAddressRouter = require("../routes/shipping.address");
const categoryRouter = require("../routes/category");

const app = express();

//mongoose connect
mongoose.connect();

//gzip compression
app.use(compress());

//helme
app.use(helmet());

//cors
app.use(cors());

//passport
app.use(passport.initialize());
require("../config/jwt");

// view engine setup
app.set("views", path.join(__dirname, "../../views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../public")));

app.use("/", indexRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/shipping-address", shippingAddressRouter);
app.use("/api/categories", categoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ message: err.message, data: err.data });
});

module.exports = app;
