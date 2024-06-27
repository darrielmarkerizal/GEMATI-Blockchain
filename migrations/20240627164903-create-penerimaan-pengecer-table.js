"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("penerimaan_pengecer", {
            id_penerimaan: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            id_pengecer: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "pengecer",
                    key: "id_pengecer",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            id_distribusi: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "distribusi_distributor",
                    key: "id_distribusi",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            tanggal_penjualan: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            jumlah_pupuk_terjual: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            data_petani_pembeli_pupuk: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
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
        await queryInterface.dropTable("penerimaan_pengecer");
    },
};
