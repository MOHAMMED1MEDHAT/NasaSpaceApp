require("dotenv").config({ path: __dirname + "/.env" });
const mongoose = require("mongoose");
const morgan = require("morgan");
// const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");

// const authJwt = require("./util/jwt");
// const errorHandler = require("./middlewares/errorHandlerMw");

const app = express();

// FIXME: ENABLE ON DEPLOYMENT
process.on("uncaughtException", (exception) => {
    console.log("uncaught Exception" + exception);
});
process.on("unhandledRejection", (exception) => {
    console.log("uncaught async Exception" + exception);
});

//mongoose connection setup
//FIXME:change to ATLAS_CONNECTION_STRING
mongoose
    .connect(process.env.ATLAS_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "Space",
    })
    .then(() => {
        console.log("Connected to db");
    })
    .catch((err) => console.log("error occured" + err));

//adding a CSP to secure from XSS
// app.use(helmet.contentSecurityPolicy({
// }));
// app.use((req, res, next) => {
//     res.setHeader('Content-Security-Policy', "default-src 'self'");
//     next();
// });

//middlewares
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
// app.options("*", cors);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
// app.use(authJwt());
// app.use(errorHandler);

//routes
// const userRouter = require("./routes/user");
// // const authRouter = require("./routes/auth");

// app.use("/api/v1/user", userRouter); //test done
// // app.use("/api/v1/user", authRouter); //test done

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`listening ....!!! on port:${port}`);
});
