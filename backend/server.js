const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/user", require("./api_user"));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${5000}`);
});
