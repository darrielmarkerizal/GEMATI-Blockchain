"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("produksi_pupuk", {
            id_produksi: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            id_pabrik: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "pabrik",
                    key: "id_pabrik",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            tanggal_produksi: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            jumlah_pupuk_diproduksi: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            batch_number: {
                type: Sequelize.STRING(50),
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
        await queryInterface.dropTable("produksi_pupuk");
    },
};
