"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("penerimaan_subsidi_petani", {
            id_subsidi: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            id_penerimaan_pengecer: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "penerimaan_pengecer",
                    key: "id_penerimaan",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            id_petani: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "petani",
                    key: "id_petani",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            timestamp: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("penerimaan_subsidi_petani");
    },
};
