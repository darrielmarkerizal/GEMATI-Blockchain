"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("penerimaan_gudang", {
            id_penerimaan: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            id_gudang: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "gudang_unit_pengantongan",
                    key: "id_gudang",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            tanggal_penerimaan: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            jumlah_pupuk_diterima: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            hasil_pengecekan_kualitas: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            tanggal_pengemasan: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            jumlah_pupuk_dikemas: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            id_produksi: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "produksi_pupuk",
                    key: "id_produksi",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
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
        await queryInterface.dropTable("penerimaan_gudang");
    },
};
