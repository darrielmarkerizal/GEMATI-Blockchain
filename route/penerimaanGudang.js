const express = require("express");
const router = express.Router();
const { ethers } = require("ethers");
const PenerimaanGudang = require("../models/penerimaan-gudang");
const Gudang = require("../models/Gudang");
dotenv = require("dotenv");

const contractABI = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_id_gudang",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_tanggal_penerimaan",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_jumlah_pupuk_diterima",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "_hasil_pengecekan_kualitas",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "_tanggal_pengemasan",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_jumlah_pupuk_dikemas",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "_sender_address",
                type: "address",
            },
            {
                internalType: "address",
                name: "_receiver_address",
                type: "address",
            },
        ],
        name: "recordPenerimaan",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
        ],
        name: "getPenerimaan",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "id_gudang",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "tanggal_penerimaan",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "jumlah_pupuk_diterima",
                        type: "uint256",
                    },
                    {
                        internalType: "string",
                        name: "hasil_pengecekan_kualitas",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "tanggal_pengemasan",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "jumlah_pupuk_dikemas",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "sender_address",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "receiver_address",
                        type: "address",
                    },
                ],
                internalType: "struct PupukDistribution.Penerimaan",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];

const contractAddress = process.env.PENERIMAAN_GUDANG_CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

router.post("/penerimaanGudang", async (req, res) => {
    const {
        senderAddress,
        receiverAddress,
        idGudang,
        tanggalPenerimaan,
        jumlahPupukDiterima,
        hasilPengecekanKualitas,
        tanggalPengemasan,
        jumlahPupukDikemas,
    } = req.body;

    if (
        !senderAddress ||
        !receiverAddress ||
        !idGudang ||
        !tanggalPenerimaan ||
        !jumlahPupukDiterima ||
        !hasilPengecekanKualitas ||
        !tanggalPengemasan ||
        !jumlahPupukDikemas
    ) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const tanggalPenerimaanUnix = Math.floor(
            new Date(tanggalPenerimaan).getTime() / 1000
        );
        const tanggalPengemasanUnix = Math.floor(
            new Date(tanggalPengemasan).getTime() / 1000
        );

        const transaction = await contract.recordPenerimaan(
            idGudang,
            tanggalPenerimaanUnix,
            jumlahPupukDiterima,
            hasilPengecekanKualitas,
            tanggalPengemasanUnix,
            jumlahPupukDikemas,
            senderAddress,
            receiverAddress
        );

        await transaction.wait();

        await PenerimaanGudang.create({
            id_gudang: idGudang,
            tanggal_penerimaan: new Date(tanggalPenerimaan),
            jumlah_pupuk_diterima: jumlahPupukDiterima,
            hasil_pengecekan_kualitas: hasilPengecekanKualitas,
            tanggal_pengemasan: new Date(tanggalPengemasan),
            jumlah_pupuk_dikemas: jumlahPupukDikemas,
            hash_transaksi: transaction.hash,
        });

        res.status(200).json({
            message: "Goods received successfully",
            transactionHash: transaction.hash,
        });
    } catch (error) {
        console.error("Error receiving goods:", error);
        res.status(500).json({ error: "Failed to receive goods" });
    }
});

router.get("/penerimaanGudang", async (req, res) => {
    try {
        const penerimaanGudang = await PenerimaanGudang.findAll({
            include: [
                {
                    model: Gudang,
                    as: "gudangUnitPengantongan",
                },
            ],
        });
        res.json(penerimaanGudang);
    } catch (error) {
        console.error("Error fetching penerimaan gudang:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
