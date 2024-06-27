const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;
const pengguna = require("./route/pengguna");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", pengguna);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
