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

            kapasitas_produksi: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },
            sertifikasi_kualitas: {
                type: Sequelize.STRING(100),
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
        await queryInterface.dropTable("pabrik");
    },
};
