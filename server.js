const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;
const pengguna = require("./route/pengguna");
const penerimaan_gudang = require("./route/penerimaanGudang");
const distribusi_distributor = require("./route/distribusiDistributor");
const penerimaan_pengecer = require("./route/penerimaanPengecer");
const subsidi_petani = require("./route/penerimaanSubsidiPetani");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", pengguna);
app.use("/", penerimaan_gudang);
app.use("/", distribusi_distributor);
app.use("/", penerimaan_pengecer);
app.use("/", subsidi_petani);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
