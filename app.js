const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const hbs=require("hbs");
const path= require("path");
const http = require('http');
const server = http.createServer(app);
const cookieParser = require('cookie-parser');
require('dotenv').config();

const errorHandler = require("./middleware/error-handler");
const errorMessage = require("./middleware/error-message");
const accessControls = require("./middleware/access-controls");
const checkAuth = require('./middleware/user-auth');
const adminAuth = require('./middleware/admin-auth');
const mongoose = require('mongoose');
const cors = require('cors');
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  
  app.use(bodyParser.json()); // to support JSON-encoded bodies

  app.use('/upload', express.static('upload'));
  

  
// Requiring Routes

const customerRoutes = require('./routes/customer.routes');
const shoesRoutes = require('./routes/shoes.routes');
const orderRoutes = require('./routes/order.routes');
const adminRoutes = require('./routes/admin.routes');
// connection to mongoose
const mongoCon = process.env.mongoCon;

mongoose.connect(mongoCon,{ useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true });


const fs = require('fs');
fs.readdirSync(__dirname + "/models").forEach(function(file) {
    require(__dirname + "/models/" + file); 
});
const static_path=path.join(__dirname,"./public");
const templates_path=path.join(__dirname,"./templetes/views");
const partials_path=path.join(__dirname,"./templetes/partials");

// in case you want to serve images 
app.use(express.static(static_path));
app.set('view engine','hbs');
app.set("views",templates_path);
hbs.registerPartials(partials_path);

app.get('/signup',  function (req, res) {
  res.render("signup")
});
app.get('/login',  function (req, res) {
  res.render("login")
});
app.get('/adminlogin',  function (req, res) {
  res.render("adminlogin")
});
app.get('/',  function (req, res) {
  res.render("home")
});
app.get('/product', function (req, res) {
  res.render("product")
});
app.get('/about',checkAuth, (req, res)=> {
  res.render("about")
});



app.set('port', (process.env.PORT));
app.use(accessControls);
app.use(cors());
app.use(cookieParser());

// Routes which should handle requests
app.use("/customer",customerRoutes);
app.use("/shoes",shoesRoutes);
app.use("/orders",orderRoutes);
app.use("/admin",adminRoutes);
// app.use("/users", userRoutes);

app.use(errorHandler);

app.use(errorMessage);

server.listen(app.get('port'));
console.log('listening on port',app.get('port'));
