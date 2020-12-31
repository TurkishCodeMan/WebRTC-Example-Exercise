const express = require("express");
const app = express();
const http = require("http").createServer(app)
const bodyParser = require("body-parser");
const passport = require("passport")
const authRoute = require("./routes/authRoute")
const cookieSession = require("cookie-session")
const cors = require("cors")
const { ExpressPeerServer } = require("peer");


//Socket İO Entegration
const socketApi = require("./socket")

socketApi.io.attach(http);

//Passport config
require("./config/passport")(passport);


//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors({
    origin: ["http://localhost:8080",
        "https://localhost:8080",
        "*"
    ],

    credentials: true,
    exposedHeaders: ["set-cookie"],

}));
app.use(cors())

const peerServer = ExpressPeerServer(http, { debug: true })
app.use("/peerjs", (req, res, next) => {
    peerServer
    next()
})

//Session (for req.user)
app.use(cookieSession({
    maxAge: 24 * 60 * 60,
    keys: ["secretKey"]
}))

app.use(passport.initialize());
app.use(passport.session());

//req.user control
app.use((req, res, next) => {
    console.log(req.isAuthenticated());
    console.log(req.user)
    next();
})

//Routes
app.use("/api", authRoute)




//Connect DB
require("./config/db")();


http.listen(3000, (err) => {
    if (err)
        console.log(err);

    console.log("Listening port 3000")
})
