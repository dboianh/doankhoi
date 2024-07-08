const express = require("express");
const path = require("path")

const cors = require("cors");

const cookieParser = require('cookie-parser')

const jwtMiddleware = require('./middleware/auth');

const multer = require('multer')

const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(cookieParser())

// app.use(jwtMiddleware.authenticateToken);
// app.use(bodyParser({limit: '50mb'}));


//socket library
const http = require('http').Server(app);


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

//Route import
const user = require("./routes/UserRoute");
const service = require("./routes/ServiceRoute")
const news = require("./routes/NewsRoute")
const portal = require("./routes/PortalRoute")
const contact = require("./routes/ContactRoute")
const attach = require("./routes/AttachmentRoute")
const gallery = require("./routes/GalleryRoute")
const outline = require("./routes/OutlineRoute")
const sys = require("./routes/AppRoute")


// API
app.use("/api/app", sys);

app.use("/api/user", user);

app.use("/api/service", service);

app.use("/api/news", news);

app.use("/api/portal", portal);

app.use("/api/contact", contact);

app.use("/api/attached", attach);

app.use("/api/gallery", gallery);

app.use("/api/outline", outline);

//API - Image store
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use("/api/uploads/service", express.static(path.join(__dirname, "uploads/service")));
// app.use("/api/uploads/portal", express.static(path.join(__dirname, "uploads/portals")));
// app.use("/api/uploads/news", express.static(path.join(__dirname, "uploads/news")));
// app.use("/api/uploads/avatar", express.static(path.join(__dirname, "uploads/avatar")));
// app.use("/api/uploads/attached", express.static(path.join(__dirname, "uploads/attached")));
// app.use("/api/uploads/album", express.static(path.join(__dirname, "uploads/album")));
// app.use("/api/uploads/outline", express.static(path.join(__dirname, "uploads/outline")));



module.exports = http;
