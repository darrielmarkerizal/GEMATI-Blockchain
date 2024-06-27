"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("petani", "id_provinsi", {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "provinsi",
                key: "id_provinsi",
            },
            onUpdate: "CASCADE",
        });

        await queryInterface.addColumn("petani", "id_pengguna", {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: "pengguna",
                key: "id_pengguna",
            },
            onUpdate: "CASCADE",
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("petani", "id_provinsi");
        await queryInterface.removeColumn("petani", "id_pengguna");
    },
};
