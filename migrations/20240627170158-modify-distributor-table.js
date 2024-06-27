"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("distributor", "id_provinsi", {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: "provinsi",
                key: "id_provinsi",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        });

        await queryInterface.addColumn("distributor", "id_pengguna", {
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
        await queryInterface.removeColumn("distributor", "id_provinsi");
        await queryInterface.removeColumn("distributor", "id_pengguna");
    },
};
