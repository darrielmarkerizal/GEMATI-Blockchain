"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("pabrik", {
            id_pabrik: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            nama_pabrik: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            // lokasi_pabrik: {
            //     type: Sequelize.INTEGER,
            //     allowNull: false,
            //     references: {
            //         model: "provinsi",
            //         key: "id_provinsi",
            //     },
            //     onUpdate: "CASCADE",
            //     onDelete: "SET NULL",
            // },
            kapasitas_produksi: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },
            sertifikasi_kualitas: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            // id_pengguna: {
            //     type: Sequelize.INTEGER,
            //     allowNull: false,
            //     references: {
            //         model: "pengguna",
            //         key: "id_pengguna",
            //     },
            //     onUpdate: "CASCADE",
            //     onDelete: "CASCADE",
            // },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal(
                    "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
                ),
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("pabrik");
    },
};
