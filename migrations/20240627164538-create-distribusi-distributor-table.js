"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("distribusi_distributor", {
            id_distribusi: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            id_distributor: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "distributor",
                    key: "id_distributor",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            id_penerimaan: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "penerimaan_gudang",
                    key: "id_penerimaan",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            tanggal_distribusi: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            jumlah_pupuk_didistribusikan: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable("distribusi_distributor");
    },
};
