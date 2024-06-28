const express = require("express");
const router = express.Router();
const ethers = require("ethers");
const DistribusiDistributorModel = require("../models/distribusi-distributor");

const contractABI = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_idDistributor",
                type: "uint256",
            },
            { internalType: "uint256", name: "_idPenerimaan", type: "uint256" },
            {
                internalType: "uint256",
                name: "_tanggalDistribusi",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_jumlahPupukDidistribusikan",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "_senderAddress",
                type: "address",
            },
            {
                internalType: "address",
                name: "_receiverAddress",
                type: "address",
            },
        ],
        name: "recordDistribusi",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256", name: "_idDistribusi", type: "uint256" },
        ],
        name: "getDistribusi",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "idDistributor",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "idPenerimaan",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "tanggalDistribusi",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "jumlahPupukDidistribusikan",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "senderAddress",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "receiverAddress",
                        type: "address",
                    },
                ],
                internalType: "struct DistribusiDistributor.Distribusi",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];

const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

router.post("/distribusiDistributor", async (req, res) => {
    const {
        senderAddress,
        receiverAddress,
        idDistributor,
        idPenerimaan,
        tanggalDistribusi,
        jumlahPupukDidistribusikan,
    } = req.body;

    if (
        !senderAddress ||
        !receiverAddress ||
        !idDistributor ||
        !idPenerimaan ||
        !tanggalDistribusi ||
        !jumlahPupukDidistribusikan
    ) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const tanggalDistribusiUnix = Math.floor(
            new Date(tanggalDistribusi).getTime() / 1000
        );

        const transaction = await contract.recordDistribusi(
            idDistributor,
            idPenerimaan,
            tanggalDistribusiUnix,
            jumlahPupukDidistribusikan,
            senderAddress,
            receiverAddress
        );

        await transaction.wait();

        await DistribusiDistributorModel.create({
            id_distributor: idDistributor,
            id_penerimaan: idPenerimaan,
            tanggal_distribusi: new Date(tanggalDistribusi),
            jumlah_pupuk_didistribusikan: jumlahPupukDidistribusikan,
            hash_transaksi: transaction.hash,
        });

        res.status(200).json({
            message: "Distribution recorded successfully",
            transactionHash: transaction.hash,
        });
    } catch (error) {
        console.error("Error recording distribution:", error);
        res.status(500).json({ error: "Failed to record distribution" });
    }
});

module.exports = router;
