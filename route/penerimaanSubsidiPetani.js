const express = require("express");
const router = express.Router();
const ethers = require("ethers");
const {
    PenerimaanSubsidiPetani,
} = require("../models/penerimaan-subsidi-petani");
const Petani = require("../models/Petani");
const PenerimaanPengecer = require("../models/penerimaan-pengecer");
const dotenv = require("dotenv");

dotenv.config();

const contractABI = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_idPenerimaanPengecer",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_idPetani",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "_sender",
                type: "address",
            },
            {
                internalType: "address",
                name: "_receiver",
                type: "address",
            },
        ],
        name: "recordPenerimaanSubsidiPetani",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];

const contractAddress = process.env.SUBSIDI_PETANI_CONTRACT_ADDRESS;
const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

router.post("/subsidiPetani", async (req, res) => {
    const { idPenerimaanPengecer, idPetani, sender, receiver } = req.body;
    const gasLimit = 3000000;

    if (!idPenerimaanPengecer || !idPetani || !sender || !receiver) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const transaction = await contract.recordPenerimaanSubsidiPetani(
            idPenerimaanPengecer,
            idPetani,
            sender,
            receiver,
            { gasLimit }
        );

        await transaction.wait();

        await PenerimaanSubsidiPetani.create({
            id_penerimaan_pengecer: idPenerimaanPengecer,
            id_petani: idPetani,
            timestamp: new Date(),
            sender: sender,
            receiver: receiver,
            id_subsidi: transaction.hash,
        });

        res.status(200).json({
            message: "Subsidy receipt recorded successfully",
            transactionHash: transaction.hash,
        });
    } catch (error) {
        console.error("Error recording subsidy receipt:", error);
        res.status(500).json({ error: "Failed to record subsidy receipt" });
    }
});

router.get("/subsidiPetani", async (req, res) => {
    try {
        const subsidiPetaniRecords = await PenerimaanSubsidiPetani.findAll();
        res.status(200).json(subsidiPetaniRecords);
    } catch (error) {
        console.error("Error fetching PenerimaanSubsidiPetani records:", error);
        res.status(500).json({
            error: "Failed to fetch PenerimaanSubsidiPetani records",
        });
    }
});

module.exports = router;
