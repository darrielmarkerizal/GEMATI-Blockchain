"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("pabrik", "id_provinsi", {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "provinsi",
                key: "id_provinsi",
            },
            onUpdate: "CASCADE",
        });

        await queryInterface.addColumn("pabrik", "id_pengguna", {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "pengguna",
                key: "id_pengguna",
            },
            onUpdate: "CASCADE",
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("pabrik", "id_provinsi");
        await queryInterface.removeColumn("pabrik", "id_pengguna");
    },
};
