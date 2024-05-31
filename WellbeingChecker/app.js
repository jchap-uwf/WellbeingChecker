const express = require("express");
let app = express();
const dayjs = require("dayjs");

// Mongoose and db setup
require("./models/db");

// User defined middleware and controllers (route implementations)
const session = require("express-session");
const middleware = require("./lib/middleware.js");
const login = require("./controllers/login");
const main = require("./controllers/main");
const search = require("./controllers/search");
const report = require("./controllers/report");
const admin = require("./controllers/admin");
const credentials = require("./credentials.js");


// set up handlebars view engine
let handlebars = require("express-handlebars").create({
  defaultLayout: "main",
  helpers: {
    formatDate: function (date, format) {
      return dayjs(date).format(format);
    },
  },
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);

// TODO: Need to set up sessions, etc.
app.use(require("cookie-parser")(credentials.cookieSecret));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
  })
)

// Form handler and static files
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// Extra middleware
app.use(middleware.populateFormData); // Handle buttons on menu bar
app.use(middleware.flashMessages); // Process flash messages

// TODO: Route implementations
//Main routes
app.get('/', main.root);
app.get('/user', middleware.loginRequired , main.report);

//Login routes
app.get('/login', login.login);
app.post('/login', login.processLogin);
app.get('/logout', middleware.loginRequired ,login.processLogout)


//Search routes
app.get('/search', search.search);
app.post('/search', search.addReports);

//Report routes
app.get('/report', middleware.loginRequired ,report.report);
app.post('/report', report.processReport);

//Admin routes
app.get('/admin', admin.admin);
app.get('/newUser', admin.detail);

// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
  res.status(404);
  res.render("404");
});

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render("500");
});

app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
