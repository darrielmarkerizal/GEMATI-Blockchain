const express = require("express");
const router = express.Router();
const { ethers } = require("ethers");
const bcrypt = require("bcrypt");
const Pengguna = require("../models/Pengguna");
const Gudang = require("../models/Gudang");
const Distributor = require("../models/Distributor");
const Pengecer = require("../models/Pengecer");
const Petani = require("../models/Petani");
const Pabrik = require("../models/Pabrik");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const rpcUrl = process.env.RPC_URL;
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

Pengguna.hasMany(Gudang, { foreignKey: "id_pengguna", as: "gudang" });
Pengguna.hasMany(Distributor, { foreignKey: "id_pengguna", as: "distributor" });
Pengguna.hasMany(Pengecer, { foreignKey: "id_pengguna", as: "pengecer" });
Pengguna.hasMany(Petani, { foreignKey: "id_pengguna", as: "petani" });
Pengguna.hasMany(Pabrik, { foreignKey: "id_pengguna", as: "pabrik" });

Pabrik.belongsTo(Pengguna, { foreignKey: "id_pengguna", as: "pengguna" });
Gudang.belongsTo(Pengguna, { foreignKey: "id_pengguna", as: "pengguna" });
Distributor.belongsTo(Pengguna, { foreignKey: "id_pengguna", as: "pengguna" });
Pengecer.belongsTo(Pengguna, { foreignKey: "id_pengguna", as: "pengguna" });
Petani.belongsTo(Pengguna, { foreignKey: "id_pengguna", as: "pengguna" });

async function createNewWallet() {
    const wallet = ethers.Wallet.createRandom({ provider });
    return wallet;
}

function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
}

function verifySuperuser(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ message: "Akses ditolak. Token tidak disediakan." });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.peran !== "superuser") {
            return res.status(403).json({
                message: "Akses ditolak. Memerlukan peran superuser.",
            });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: "Token tidak valid." });
    }
}

function verifyGudangAccess(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ message: "Akses ditolak. Token tidak disediakan." });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.peran !== "superuser" && decoded.peran !== "pabrik") {
            return res.status(403).json({
                message:
                    "Akses ditolak. Memerlukan peran superuser atau pabrik.",
            });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: "Token tidak valid." });
    }
}

function verifyDistributorAccess(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ message: "Akses ditolak. Token tidak disediakan." });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (
            decoded.peran !== "superuser" &&
            decoded.peran !== "pabrik" &&
            decoded.peran !== "gudang"
        ) {
            return res.status(403).json({
                message:
                    "Akses ditolak. Memerlukan peran superuser, pabrik, gudang",
            });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: "Token tidak valid." });
    }
}

function verifyPengecerAccess(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ message: "Akses ditolak. Token tidak disediakan." });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (
            decoded.peran !== "superuser" &&
            decoded.peran !== "pabrik" &&
            decoded.peran !== "gudang" &&
            decoded.peran !== "distributor"
        ) {
            return res.status(403).json({
                message:
                    "Akses ditolak. Memerlukan peran superuser, pabrik, gudang, dan distributor",
            });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: "Token tidak valid." });
    }
}

function verifyPetaniAccess(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ message: "Akses ditolak. Token tidak disediakan." });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (
            decoded.peran !== "superuser" &&
            decoded.peran !== "pabrik" &&
            decoded.peran !== "gudang" &&
            decoded.peran !== "distributor" &&
            decoded.peran !== "pengecer"
        ) {
            return res.status(403).json({
                message:
                    "Akses ditolak. Memerlukan peran superuser, pabrik, gudang, distributor, dan pengecer",
            });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: "Token tidak valid." });
    }
}

router.post("/register/superuser", async (req, res) => {
    const { nama_pengguna, username, password } = req.body;

    try {
        const peran = "superuser";

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const wallet = await createNewWallet();
        const walletAddress = wallet.address;

        const penggunaBaru = await Pengguna.create({
            nama_pengguna,
            peran,
            username,
            password: hashedPassword,
            blockchain_address: walletAddress,
        });

        return res.status(201).json({
            message: "Pengguna superuser berhasil dibuat",
            pengguna: penggunaBaru,
        });
    } catch (error) {
        console.error("Gagal membuat pengguna superuser:", error);
        return res.status(500).json({
            message: "Gagal membuat pengguna superuser",
            error: error.message,
        });
    }
});

router.post("/register/pabrik", async (req, res) => {
    const {
        nama_pengguna,
        username,
        password,
        nama_pabrik,
        kapasitas_produksi,
        sertifikasi_kualitas,
        id_provinsi,
    } = req.body;

    try {
        const peran = "pabrik";

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const wallet = await createNewWallet();
        const walletAddress = wallet.address;

        const penggunaBaru = await Pengguna.create({
            nama_pengguna,
            peran,
            username,
            password: hashedPassword,
            blockchain_address: walletAddress,
        });

        const pabrikBaru = await Pabrik.create({
            nama_pabrik,
            kapasitas_produksi,
            sertifikasi_kualitas,
            id_provinsi,
            id_pengguna: penggunaBaru.id_pengguna,
        });

        return res.status(201).json({
            message: "Pengguna pabrik berhasil dibuat",
            pengguna: {
                id_pengguna: penggunaBaru.id_pengguna,
                nama_pengguna: penggunaBaru.nama_pengguna,
                peran: penggunaBaru.peran,
                username: penggunaBaru.username,
                password: penggunaBaru.password,
                blockchain_address: penggunaBaru.blockchain_address,
                updatedAt: penggunaBaru.updatedAt,
                createdAt: penggunaBaru.createdAt,
            },
            pabrik: pabrikBaru,
        });
    } catch (error) {
        console.error("Gagal membuat pabrik:", error);
        return res.status(500).json({
            message: "Gagal membuat pabrik",
            error: error.message,
        });
    }
});

router.post("/register/gudang", async (req, res) => {
    const {
        nama_pengguna,
        username,
        password,
        nama_gudang,
        kapasitas_gudang,
        id_provinsi,
    } = req.body;

    try {
        const peran = "gudang";

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const wallet = await createNewWallet();
        const walletAddress = wallet.address;

        const penggunaBaru = await Pengguna.create({
            nama_pengguna,
            peran,
            username,
            password: hashedPassword,
            blockchain_address: walletAddress,
        });

        const gudangBaru = await Gudang.create({
            nama_gudang,
            kapasitas_gudang,
            id_provinsi,
            id_pengguna: penggunaBaru.id_pengguna,
        });

        return res.status(201).json({
            message: "Pengguna gudang berhasil dibuat",
            pengguna: {
                id_pengguna: penggunaBaru.id_pengguna,
                nama_pengguna: penggunaBaru.nama_pengguna,
                peran: penggunaBaru.peran,
                username: penggunaBaru.username,
                password: penggunaBaru.password,
                blockchain_address: penggunaBaru.blockchain_address,
                updatedAt: penggunaBaru.updatedAt,
                createdAt: penggunaBaru.createdAt,
            },
            gudang: gudangBaru,
        });
    } catch (error) {
        console.error("Gagal membuat gudang:", error);
        return res.status(500).json({
            message: "Gagal membuat gudang",
            error: error.message,
        });
    }
});

router.post("/register/distributor", async (req, res) => {
    const {
        nama_pengguna,
        username,
        password,
        nama_distributor,
        kabupaten_kota,
        id_provinsi,
    } = req.body;

    try {
        const peran = "distributor";

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const wallet = await createNewWallet();
        const walletAddress = wallet.address;

        const penggunaBaru = await Pengguna.create({
            nama_pengguna,
            peran,
            username,
            password: hashedPassword,
            blockchain_address: walletAddress,
        });

        const distributorBaru = await Distributor.create({
            nama_distributor,
            kabupaten_kota,
            id_provinsi,
            id_pengguna: penggunaBaru.id_pengguna,
        });

        return res.status(201).json({
            message: "Pengguna distributor berhasil dibuat",
            pengguna: {
                id_pengguna: penggunaBaru.id_pengguna,
                nama_pengguna: penggunaBaru.nama_pengguna,
                peran: penggunaBaru.peran,
                username: penggunaBaru.username,
                password: penggunaBaru.password,
                blockchain_address: penggunaBaru.blockchain_address,
                updatedAt: penggunaBaru.updatedAt,
                createdAt: penggunaBaru.createdAt,
            },
            distributor: distributorBaru,
        });
    } catch (error) {
        console.error("Gagal membuat pengguna distributor:", error);
        return res.status(500).json({
            message: "Gagal membuat pengguna distributor",
            error: error.message,
        });
    }
});

router.post("/register/pengecer", async (req, res) => {
    const {
        nama_pengguna,
        username,
        password,
        nama_pengecer,
        kabupaten_kota,
        id_provinsi,
    } = req.body;

    try {
        const peran = "pengecer";

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const wallet = await createNewWallet();
        const walletAddress = wallet.address;

        const penggunaBaru = await Pengguna.create({
            nama_pengguna,
            peran,
            username,
            password: hashedPassword,
            blockchain_address: walletAddress,
        });

        const pengecerBaru = await Pengecer.create({
            nama_pengecer,
            kabupaten_kota,
            id_provinsi,
            id_pengguna: penggunaBaru.id_pengguna,
        });

        return res.status(201).json({
            message: "Pengguna pengecer berhasil dibuat",
            pengguna: {
                id_pengguna: penggunaBaru.id_pengguna,
                nama_pengguna: penggunaBaru.nama_pengguna,
                peran: penggunaBaru.peran,
                username: penggunaBaru.username,
                password: penggunaBaru.password,
                blockchain_address: penggunaBaru.blockchain_address,
                updatedAt: penggunaBaru.updatedAt,
                createdAt: penggunaBaru.createdAt,
            },
            pengecer: pengecerBaru,
        });
    } catch (error) {
        console.error("Gagal membuat pengguna pengecer:", error);
        return res.status(500).json({
            message: "Gagal membuat pengguna pengecer",
            error: error.message,
        });
    }
});

router.post("/register/petani", async (req, res) => {
    const {
        nama_pengguna,
        username,
        password,
        nama_petani,
        kabupaten_kota,
        kecamatan,
        id_provinsi,
    } = req.body;

    try {
        const peran = "petani";

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const wallet = await createNewWallet();
        const walletAddress = wallet.address;

        const penggunaBaru = await Pengguna.create({
            nama_pengguna,
            peran,
            username,
            password: hashedPassword,
            blockchain_address: walletAddress,
        });

        const petaniBaru = await Petani.create({
            nama_petani,
            kabupaten_kota,
            kecamatan,
            id_provinsi,
            id_pengguna: penggunaBaru.id_pengguna,
        });

        return res.status(201).json({
            message: "Pengguna petani berhasil dibuat",
            pengguna: {
                id_pengguna: penggunaBaru.id_pengguna,
                nama_pengguna: penggunaBaru.nama_pengguna,
                peran: penggunaBaru.peran,
                username: penggunaBaru.username,
                password: penggunaBaru.password,
                blockchain_address: penggunaBaru.blockchain_address,
                updatedAt: penggunaBaru.updatedAt,
                createdAt: penggunaBaru.createdAt,
            },
            petani: petaniBaru,
        });
    } catch (error) {
        console.error("Gagal membuat pengguna petani:", error);
        return res.status(500).json({
            message: "Gagal membuat pengguna petani",
            error: error.message,
        });
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const pengguna = await Pengguna.findOne({ where: { username } });

        if (!pengguna) {
            return res
                .status(404)
                .json({ message: "Pengguna tidak ditemukan" });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            pengguna.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Password salah" });
        }

        const token = generateToken({
            id_pengguna: pengguna.id_pengguna,
            nama_pengguna: pengguna.nama_pengguna,
            peran: pengguna.peran,
            blockchain_address: pengguna.blockchain_address,
        });

        return res.status(200).json({ token });
    } catch (error) {
        console.error("Gagal melakukan login:", error);
        return res
            .status(500)
            .json({ message: "Gagal melakukan login", error: error.message });
    }
});

router.get("/pengguna", verifySuperuser, async (req, res) => {
    try {
        const pengguna = await Pengguna.findAll({
            attributes: { exclude: ["password"] },
        });

        const penggunaPerPeran = pengguna.reduce((acc, pengguna) => {
            const peran = pengguna.peran || "Tidak diketahui";
            if (!acc[peran]) {
                acc[peran] = [];
            }
            acc[peran].push(pengguna);
            return acc;
        }, {});

        res.json(penggunaPerPeran);
    } catch (error) {
        console.error("Error fetching users by role:", error);
        res.status(500).json({
            message:
                "Terjadi kesalahan saat mengambil data pengguna berdasarkan peran",
        });
    }
});

router.get("/pabrik", verifySuperuser, async (req, res) => {
    try {
        const pabrik = await Pabrik.findAll({
            include: [
                {
                    model: Pengguna,
                    as: "pengguna",
                    attributes: { exclude: ["password"] },
                },
            ],
        });

        return res.json(pabrik);
    } catch (error) {
        console.error("Error fetching pabrik:", error);
        return res.status(500).json({
            message: "Terjadi kesalahan saat mengambil data pabrik",
            error: error.message,
        });
    }
});

router.get("/gudang", verifyGudangAccess, async (req, res) => {
    try {
        const gudang = await Gudang.findAll({
            include: [
                {
                    model: Pengguna,
                    as: "pengguna",
                    attributes: { exclude: ["password"] },
                },
            ],
        });

        return res.json(gudang);
    } catch (error) {
        console.error("Error fetching gudang:", error);
        return res.status(500).json({
            message: "Terjadi kesalahan saat mengambil data gudang",
            error: error.message,
        });
    }
});

router.get("/distributor", verifyDistributorAccess, async (req, res) => {
    try {
        const distributor = await Distributor.findAll({
            include: [
                {
                    model: Pengguna,
                    as: "pengguna",
                    attributes: { exclude: ["password"] },
                },
            ],
        });

        return res.json(distributor);
    } catch (error) {
        console.error("Error fetching distributor:", error);
        return res.status(500).json({
            message: "Terjadi kesalahan saat mengambil data distributor",
            error: error.message,
        });
    }
});

router.get("/pengecer", verifyPengecerAccess, async (req, res) => {
    try {
        const pengecer = await Pengecer.findAll({
            include: [
                {
                    model: Pengguna,
                    as: "pengguna",
                    attributes: { exclude: ["password"] },
                },
            ],
        });

        return res.json(pengecer);
    } catch (error) {
        console.error("Error fetching pengecer:", error);
        return res.status(500).json({
            message: "Terjadi kesalahan saat mengambil data pengecer",
            error: error.message,
        });
    }
});

router.get("/petani", verifyPetaniAccess, async (req, res) => {
    try {
        const petani = await Petani.findAll({
            include: [
                {
                    model: Pengguna,
                    as: "pengguna",
                    attributes: { exclude: ["password"] },
                },
            ],
        });

        return res.json(petani);
    } catch (error) {
        console.error("Error fetching petani:", error);
        return res.status(500).json({
            message: "Terjadi kesalahan saat mengambil data petani",
            error: error.message,
        });
    }
});

router.get("/pengguna/:id_pengguna", verifySuperuser, async (req, res) => {
    try {
        const pengguna = await Pengguna.findByPk(req.params.id_pengguna, {
            attributes: { exclude: ["password"] },
        });
        if (!pengguna) {
            return res
                .status(404)
                .json({ message: "Pengguna tidak ditemukan." });
        }
        res.json(pengguna);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            message: "Terjadi kesalahan saat mengambil data pengguna",
        });
    }
});

router.get("/pabrik/:id_pengguna", verifySuperuser, async (req, res) => {
    try {
        const pabrik = await Pabrik.findOne({
            where: { penggunaId: req.params.id_pengguna },
            include: [
                {
                    model: Pengguna,
                    as: "pengguna",
                    attributes: { exclude: ["password"] },
                },
            ],
        });
        if (!pabrik) {
            return res.status(404).json({ message: "Pabrik tidak ditemukan." });
        }
        res.json(pabrik);
    } catch (error) {
        console.error("Error fetching pabrik:", error);
        res.status(500).json({
            message: "Terjadi kesalahan saat mengambil data pabrik",
        });
    }
});

router.get("/gudang/:id_pengguna", verifyGudangAccess, async (req, res) => {
    try {
        const gudang = await Gudang.findOne({
            where: { penggunaId: req.params.id_pengguna },
            include: [
                {
                    model: Pengguna,
                    as: "pengguna",
                    attributes: { exclude: ["password"] },
                },
            ],
        });
        if (!gudang) {
            return res.status(404).json({ message: "Gudang tidak ditemukan." });
        }
        res.json(gudang);
    } catch (error) {
        console.error("Error fetching gudang:", error);
        res.status(500).json({
            message: "Terjadi kesalahan saat mengambil data gudang",
        });
    }
});

router.get(
    "/distributor/:id_pengguna",
    verifyDistributorAccess,
    async (req, res) => {
        try {
            const distributor = await Distributor.findOne({
                where: { penggunaId: req.params.id_pengguna },
                include: [
                    {
                        model: Pengguna,
                        as: "pengguna",
                        attributes: { exclude: ["password"] },
                    },
                ],
            });
            if (!distributor) {
                return res
                    .status(404)
                    .json({ message: "Distributor tidak ditemukan." });
            }
            res.json(distributor);
        } catch (error) {
            console.error("Error fetching distributor:", error);
            res.status(500).json({
                message: "Terjadi kesalahan saat mengambil data distributor",
            });
        }
    }
);

router.get("/pengecer/:id_pengguna", verifyPengecerAccess, async (req, res) => {
    try {
        const pengecer = await Pengecer.findOne({
            where: { penggunaId: req.params.id_pengguna },
            include: [
                {
                    model: Pengguna,
                    as: "pengguna",
                    attributes: { exclude: ["password"] },
                },
            ],
        });
        if (!pengecer) {
            return res
                .status(404)
                .json({ message: "Pengecer tidak ditemukan." });
        }
        res.json(pengecer);
    } catch (error) {
        console.error("Error fetching pengecer:", error);
        res.status(500).json({
            message: "Terjadi kesalahan saat mengambil data pengecer",
        });
    }
});

router.get("/petani/:id_pengguna", verifyPetaniAccess, async (req, res) => {
    try {
        const petani = await Petani.findOne({
            where: { penggunaId: req.params.id_pengguna },
            include: [
                {
                    model: Pengguna,
                    as: "pengguna",
                    attributes: { exclude: ["password"] },
                },
            ],
        });
        if (!petani) {
            return res.status(404).json({ message: "Petani tidak ditemukan." });
        }
        res.json(petani);
    } catch (error) {
        console.error("Error fetching petani:", error);
        res.status(500).json({
            message: "Terjadi kesalahan saat mengambil data petani",
        });
    }
});

module.exports = router;
