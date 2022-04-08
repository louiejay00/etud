const port = process.env.PORT || 5000;
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./router/user.js");
const driverRoutes = require("./router/driver.js");
const fareRoutes = require("./router/fare.js");
const logsRoute = require("./router/logs.js");
const queueRoute = require("./router/queue");
const adminRoute = require("./router/admin");
const processRoute = require("./router/process");
const path = require("path");
app.use(express.json());
app.use(cors());
//DB URL||URI
const CONNECTION_URL =
  "mongodb+srv://root:root@cluster0.pkf1s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//Connection Part
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

//host fronend/build folder
app.use(express.static(__dirname + "/frontend/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "/frontend/build", "index.html"));
});
// User Routes
app.use("/user", userRoutes);
//Driver Routes
app.use("/driver", driverRoutes);
//fare Routes
app.use("/fare", fareRoutes);
//Logs Routess
app.use("/log", logsRoute);

app.use("/process", processRoute);

app.use("/queue", queueRoute);

app.use("/admin", adminRoute);
app.listen(port, () => console.log("Running on port 5000"));
