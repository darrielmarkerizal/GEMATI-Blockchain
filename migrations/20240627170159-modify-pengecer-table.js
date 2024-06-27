"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("pengecer", "id_provinsi", {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: "provinsi",
                key: "id_provinsi",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        });

        await queryInterface.addColumn("pengecer", "id_pengguna", {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: "pengguna",
                key: "id_pengguna",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("pengecer", "id_provinsi");
        await queryInterface.removeColumn("pengecer", "id_pengguna");
    },
};
