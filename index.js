const express = require("express");
const { ConnectToMongoDb } = require("./connect");
const URL = require("./Models/Url");
const path = require("path");
const {  checkForAuthentication,restrictTo} = require('./middleware/Auth')
const cookieParser = require('cookie-parser');

const staticRoute = require('./Routes/StaticRoute');
const urlRoutes = require("./Routes/url");
const UserRouter = require("./Routes/User");

const app = express();
const PORT = 8001;

ConnectToMongoDb("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));


app.set("view engine", "ejs");
app.set("views",path.resolve("./views"))

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication)


/** Routers */
app.use("/url" ,restrictTo(['NORMAL','ADMIN']), urlRoutes);
app.use("/",staticRoute);
app.use("/user",UserRouter); 

/** for redirecting and Adding analytics in visited history */
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitedHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`server is runnig on the ${PORT}`);
});
