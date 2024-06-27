"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Seed data for jenis_pupuk table
        await queryInterface.bulkInsert(
            "jenis_pupuk",
            [
                {
                    jenis_pupuk: "Urea",
                    deskripsi:
                        "Pupuk anorganik yang mengandung nitrogen tinggi.",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    jenis_pupuk: "SP-36",
                    deskripsi:
                        "Pupuk anorganik dengan kandungan fosfat superfosfat.",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    jenis_pupuk: "ZA",
                    deskripsi:
                        "Pupuk anorganik dengan kandungan unsur hara fosfat dan zinc.",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    jenis_pupuk: "NPK",
                    deskripsi:
                        "Pupuk anorganik dengan kandungan nitrogen, fosfor, dan kalium.",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    jenis_pupuk: "NPK Formula Khusus",
                    deskripsi:
                        "Pupuk NPK dengan formula khusus sesuai kebutuhan tanaman.",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    jenis_pupuk: "Granul",
                    deskripsi:
                        "Pupuk dalam bentuk granul untuk aplikasi di lapangan.",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    jenis_pupuk: "Cair",
                    deskripsi:
                        "Pupuk dalam bentuk cair untuk aplikasi penyiraman.",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        // Remove seeded data from jenis_pupuk table
        await queryInterface.bulkDelete("jenis_pupuk", null, {});
    },
};
