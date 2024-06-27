"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "provinsi",
            [
                {
                    id_provinsi: "11",
                    nama_provinsi: "ACEH",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "12",
                    nama_provinsi: "SUMATERA UTARA",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "13",
                    nama_provinsi: "SUMATERA BARAT",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "14",
                    nama_provinsi: "RIAU",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "15",
                    nama_provinsi: "JAMBI",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "16",
                    nama_provinsi: "SUMATERA SELATAN",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "17",
                    nama_provinsi: "BENGKULU",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "18",
                    nama_provinsi: "LAMPUNG",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "19",
                    nama_provinsi: "KEPULAUAN BANGKA BELITUNG",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "21",
                    nama_provinsi: "KEPULAUAN RIAU",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "31",
                    nama_provinsi: "DKI JAKARTA",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "32",
                    nama_provinsi: "JAWA BARAT",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "33",
                    nama_provinsi: "JAWA TENGAH",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "34",
                    nama_provinsi: "DI YOGYAKARTA",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "35",
                    nama_provinsi: "JAWA TIMUR",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "36",
                    nama_provinsi: "BANTEN",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "51",
                    nama_provinsi: "BALI",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "52",
                    nama_provinsi: "NUSA TENGGARA BARAT",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "53",
                    nama_provinsi: "NUSA TENGGARA TIMUR",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "61",
                    nama_provinsi: "KALIMANTAN BARAT",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "62",
                    nama_provinsi: "KALIMANTAN TENGAH",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "63",
                    nama_provinsi: "KALIMANTAN SELATAN",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "64",
                    nama_provinsi: "KALIMANTAN TIMUR",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "65",
                    nama_provinsi: "KALIMANTAN UTARA",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "71",
                    nama_provinsi: "SULAWESI UTARA",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "72",
                    nama_provinsi: "SULAWESI TENGAH",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "73",
                    nama_provinsi: "SULAWESI SELATAN",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "74",
                    nama_provinsi: "SULAWESI TENGGARA",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "75",
                    nama_provinsi: "GORONTALO",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "76",
                    nama_provinsi: "SULAWESI BARAT",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "81",
                    nama_provinsi: "MALUKU",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "82",
                    nama_provinsi: "MALUKU UTARA",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "91",
                    nama_provinsi: "PAPUA BARAT",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id_provinsi: "94",
                    nama_provinsi: "PAPUA",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("provinsi", null, {});
    },
};
