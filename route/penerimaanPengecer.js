const express = require("express");
const router = express.Router();
const ethers = require("ethers");
const PenerimaanPengecer = require("../models/penerimaan-pengecer");
const DistribusiDistributor = require("../models/distribusi-distributor");
const Pengecer = require("../models/Pengecer");

require("dotenv").config();

const contractABI = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_idPengecer",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_idDistribusi",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_tanggalPenjualan",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_jumlahPupukTerjual",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "_dataPetaniPembeliPupuk",
                type: "string",
            },
            {
                internalType: "address",
                name: "_receiver",
                type: "address",
            },
            { internalType: "address", name: "_sender", type: "address" },
        ],
        name: "recordPenerimaan",
        outputs: [
            {
                internalType: "uint256",
                name: "_idPenerimaan",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
];

const contractAddress = process.env.PENERIMAAN_PENGECER_CONTRACT_ADDRESS;
const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

router.post("/penerimaanPengecer", async (req, res) => {
    const {
        senderAddress,
        receiverAddress,
        idPengecer,
        idDistribusi,
        tanggalPenjualan,
        jumlahPupukTerjual,
        dataPetaniPembeliPupuk,
    } = req.body;

    if (
        !senderAddress ||
        !receiverAddress ||
        !idPengecer ||
        !idDistribusi ||
        !tanggalPenjualan ||
        !jumlahPupukTerjual ||
        !dataPetaniPembeliPupuk
    ) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const tanggalPenjualanUnix = Math.floor(
            new Date(tanggalPenjualan).getTime() / 1000
        );

        const transaction = await contract.recordPenerimaan(
            idPengecer,
            idDistribusi,
            tanggalPenjualanUnix,
            jumlahPupukTerjual,
            dataPetaniPembeliPupuk,
            receiverAddress,
            senderAddress
        );

        await transaction.wait();

        const newPenerimaan = await PenerimaanPengecer.create({
            id_pengecer: idPengecer,
            id_distribusi: idDistribusi,
            tanggal_penjualan: new Date(tanggalPenjualan),
            jumlah_pupuk_terjual: jumlahPupukTerjual,
            data_petani_pembeli_pupuk: dataPetaniPembeliPupuk,
            hash_transaksi: transaction.hash,
        });

        res.status(200).json({
            message: "Penerimaan recorded successfully",
            transactionHash: transaction.hash,
            penerimaan: newPenerimaan,
        });
    } catch (error) {
        console.error("Error recording penerimaan:", error);
        res.status(500).json({ error: "Failed to record penerimaan" });
    }
});

router.get("/penerimaanPengecer", async (req, res) => {
    try {
        const penerimaanPengecerData = await PenerimaanPengecer.findAll({
            include: [
                {
                    model: DistribusiDistributor,
                    as: "distribusi_distributor",
                    attributes: [
                        "id_distribusi",
                        "id_distributor",
                        "id_penerimaan",
                        "tanggal_distribusi",
                        "jumlah_pupuk_didistribusikan",
                        "hash_transaksi",
                    ],
                },
                {
                    model: Pengecer,
                    as: "pengecer",
                    attributes: [
                        "id_pengecer",
                        "nama_pengecer",
                        "kabupaten_kota",
                        "id_provinsi",
                        "id_pengguna",
                    ],
                },
            ],
        });

        res.json(penerimaanPengecerData);
    } catch (error) {
        console.error("Error fetching PenerimaanPengecer data:", error);
        res.status(500).json({
            error: "Failed to fetch PenerimaanPengecer data",
        });
    }
});

module.exports = router;
